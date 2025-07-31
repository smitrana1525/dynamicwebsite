using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using MoneyCareBackend.Services;
using MoneyCareBackend.Models;
using MoneyCareBackend.Data;
using MoneyCareBackend.DTOs;
using System.Security.Claims;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly MoneyCareDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, MoneyCareDbContext context, IConfiguration configuration, IEmailService emailService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (registerDto == null)
                return BadRequest(new { message = "Registration data is required." });

            // Check for duplicate email
            if (_context.mstUsers.Any(u => u.strEmailId == registerDto.Email))
                return Conflict(new { message = "Email already exists. Please use a different email or try logging in." });

            // Create new user with hashed password
            var user = new mstUser
            {
                strGUID = Guid.NewGuid().ToString(),
                strName = registerDto.Name,
                strEmailId = registerDto.Email,
                bolsActive = true,
                strPassword = _authService.HashPassword(registerDto.Password), // Hash the password
                strOTP = "000000", // Default OTP for new users
                OtpExpiretIme = DateTime.UtcNow.AddHours(24), // OTP expires in 24 hours
                createDate = DateTime.UtcNow,
                ModifyDate = DateTime.UtcNow
            };

            _context.mstUsers.Add(user);
            await _context.SaveChangesAsync();

            // Generate tokens
            var token = _authService.GenerateJwtToken(user);
            var refreshToken = await _authService.GenerateRefreshTokenAsync(user.strGUID);

            return Ok(new TokenResponseDTO
            {
                Token = token,
                RefreshToken = refreshToken.Token,
                User = new UserReadDTO
                {
                    strGUID = user.strGUID,
                    strName = user.strName,
                    strEmailId = user.strEmailId,
                    bolsActive = user.bolsActive,
                    createDate = user.createDate,
                    ModifyDate = user.ModifyDate,
                    AuthProvider = "email"
                },
                AuthProvider = "email",
                IsNewUser = true,
                Message = "User registered successfully!"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
                return BadRequest(new { message = "Email and password are required." });

            // For testing purposes, allow login with test credentials without database
            if (loginDto.Email == "test@example.com" && loginDto.Password == "Test123!")
            {
                var testUser = new mstUser
                {
                    strGUID = "test-user-guid-123",
                    strName = "Test User",
                    strEmailId = "test@example.com",
                    bolsActive = true,
                    createDate = DateTime.UtcNow,
                    ModifyDate = DateTime.UtcNow
                };

                var token = _authService.GenerateJwtToken(testUser);
                var refreshToken = await _authService.GenerateRefreshTokenAsync(testUser.strGUID);

                // Set cookie for JWT token (local dev: Secure=false, SameSite=Lax)
                Response.Cookies.Append("moneycareath", token, new CookieOptions
                {
                    HttpOnly = false, // Set to true for more security
                    Secure = false, // Changed to false for local development
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddHours(24)
                });

                return Ok(new TokenResponseDTO
                {
                    Token = token,
                    RefreshToken = refreshToken.Token,
                    User = new UserReadDTO
                    {
                        strGUID = testUser.strGUID,
                        strName = testUser.strName,
                        strEmailId = testUser.strEmailId,
                        bolsActive = testUser.bolsActive,
                        createDate = testUser.createDate,
                        ModifyDate = testUser.ModifyDate,
                        AuthProvider = "email"
                    },
                    AuthProvider = "email",
                    IsNewUser = false,
                    Message = "Login successful!"
                });
            }

            // Try normal database authentication
            try
            {
                var user = await _authService.ValidateUserAsync(loginDto.Email, loginDto.Password);
                if (user == null)
                    return Unauthorized(new { message = "Invalid email or password." });

                var token = _authService.GenerateJwtToken(user);
                var refreshToken = await _authService.GenerateRefreshTokenAsync(user.strGUID);

                // Set cookie for JWT token (local dev: Secure=false, SameSite=Lax)
                Response.Cookies.Append("moneycareath", token, new CookieOptions
                {
                    HttpOnly = false, // Set to true for more security
                    Secure = false, // Changed to false for local development
                SameSite = SameSiteMode.None, // Required for cross-origin cookies with credentials
                Expires = DateTime.UtcNow.AddHours(24)
            });

            return Ok(new TokenResponseDTO
            {
                Token = token,
                RefreshToken = refreshToken.Token,
                User = new UserReadDTO
                {
                    strGUID = user.strGUID,
                    strName = user.strName,
                    strEmailId = user.strEmailId,
                    bolsActive = user.bolsActive,
                    createDate = user.createDate,
                    ModifyDate = user.ModifyDate,
                    AuthProvider = "email"
                },
                AuthProvider = "email",
                IsNewUser = false,
                Message = "Login successful!"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during login.", error = ex.Message });
        }
    }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPasswordDto)
        {
            if (forgotPasswordDto == null || string.IsNullOrEmpty(forgotPasswordDto.Email))
                return BadRequest(new { message = "Email is required." });

            var user = await _authService.GetUserByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
                return NotFound(new { message = "User with this email does not exist." });

            // Generate a 6-digit OTP
            var random = new Random();
            var otp = random.Next(100000, 999999).ToString();
            
            // Set OTP expiration to 10 minutes from now
            var otpExpiry = DateTime.UtcNow.AddMinutes(10);

            // Update user with new OTP and expiration
            user.strOTP = otp;
            user.OtpExpiretIme = otpExpiry;
            user.ModifyDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send OTP via email
            _logger.LogInformation($"Attempting to send OTP email to {user.strEmailId} with OTP: {otp}");
            var emailSent = await _emailService.SendOTPEmailAsync(user.strEmailId, otp, user.strName ?? "User");
            
            if (!emailSent)
            {
                _logger.LogWarning($"Failed to send OTP email to {user.strEmailId}");
                return StatusCode(500, new { message = "Failed to send OTP email. Please try again later." });
            }

            _logger.LogInformation($"OTP sent successfully to {user.strEmailId}");

            var response = new OTPResponseDTO
            {
                Success = true,
                Message = "OTP has been sent to your email address.",
                Email = user.strEmailId,
                ExpiresAt = otpExpiry,
                RemainingMinutes = 10
                // OTP is not returned in response for security
            };

            _logger.LogInformation($"Returning response: {System.Text.Json.JsonSerializer.Serialize(response)}");
            return Ok(response);
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOTP([FromBody] VerifyOTPDTO verifyOtpDto)
        {
            if (verifyOtpDto == null || string.IsNullOrEmpty(verifyOtpDto.Email) || string.IsNullOrEmpty(verifyOtpDto.OTP))
                return BadRequest(new { message = "Email and OTP are required." });

            var user = await _authService.GetUserByEmailAsync(verifyOtpDto.Email);
            if (user == null)
                return NotFound(new { message = "User with this email does not exist." });

            // Check if OTP matches and is not expired
            if (user.strOTP != verifyOtpDto.OTP)
                return BadRequest(new { message = "Invalid OTP." });

            if (DateTime.UtcNow > user.OtpExpiretIme)
                return BadRequest(new { message = "OTP has expired. Please request a new one." });

            return Ok(new { 
                Success = true, 
                Message = "OTP verified successfully. You can now reset your password.",
                Email = user.strEmailId
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            if (resetPasswordDto == null || string.IsNullOrEmpty(resetPasswordDto.Email) || 
                string.IsNullOrEmpty(resetPasswordDto.OTP) || string.IsNullOrEmpty(resetPasswordDto.NewPassword))
                return BadRequest(new { message = "Email, OTP, and new password are required." });

            var user = await _authService.GetUserByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return NotFound(new { message = "User with this email does not exist." });

            // Verify OTP
            if (user.strOTP != resetPasswordDto.OTP)
                return BadRequest(new { message = "Invalid OTP." });

            if (DateTime.UtcNow > user.OtpExpiretIme)
                return BadRequest(new { message = "OTP has expired. Please request a new one." });

            // Update password with hash and clear OTP
            user.strPassword = _authService.HashPassword(resetPasswordDto.NewPassword); // Hash the new password
            user.strOTP = "000000"; // Clear OTP after use
            user.OtpExpiretIme = DateTime.UtcNow; // Set to past time to invalidate
            user.ModifyDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send password reset confirmation email
            var emailSent = await _emailService.SendPasswordResetEmailAsync(user.strEmailId, user.strName ?? "User");
            
            if (!emailSent)
            {
                _logger.LogWarning($"Failed to send password reset confirmation email to {user.strEmailId}");
                // Don't fail the request if confirmation email fails
            }
            else
            {
                _logger.LogInformation($"Password reset confirmation email sent successfully to {user.strEmailId}");
            }

            return Ok(new { 
                Success = true, 
                Message = "Password has been reset successfully. You can now login with your new password.",
                Email = user.strEmailId,
                RedirectToLogin = true
            });
        }

        [HttpGet("google")]
        public IActionResult GoogleLogin()
        {
            // Check if Google OAuth is properly configured
            var clientId = _configuration["Authentication:Google:ClientId"];
            var clientSecret = _configuration["Authentication:Google:ClientSecret"];
            
            if (string.IsNullOrEmpty(clientId) || clientId == "your-google-client-id")
            {
                return BadRequest(new { 
                    message = "Google OAuth is not configured. Please set up Google OAuth credentials in appsettings.json",
                    setupInstructions = "1. Go to Google Cloud Console\n2. Create OAuth 2.0 credentials\n3. Add ClientId and ClientSecret to appsettings.json",
                    note = "This endpoint redirects to Google OAuth. Use a browser or Postman to test it properly."
                });
            }

            Console.WriteLine($"=== OAuth Login Debug ===");
            Console.WriteLine($"Client ID: {clientId?.Substring(0, 20)}...");
            Console.WriteLine($"Redirect URI: {Request.Scheme}://{Request.Host}/api/auth/google-callback");
            Console.WriteLine($"Request Headers: {string.Join(", ", Request.Headers.Select(h => $"{h.Key}={h.Value}"))}");
            Console.WriteLine($"Request Cookies: {string.Join(", ", Request.Cookies.Select(c => $"{c.Key}={c.Value}"))}");
            Console.WriteLine($"=== End Login Debug ===");

            // Generate a custom state parameter
            var state = Guid.NewGuid().ToString();
            
            // Store state in a custom cookie
            Response.Cookies.Append("MoneyCare.OAuth.State", state, new CookieOptions
            {
                HttpOnly = false,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.None,
                MaxAge = TimeSpan.FromMinutes(10),
                Path = "/"
            });

            // Build the Google OAuth URL manually
            var redirectUri = $"{Request.Scheme}://{Request.Host}/api/auth/google-callback";
            var scope = "openid email profile";
            var responseType = "code";
            
            var googleAuthUrl = $"https://accounts.google.com/o/oauth2/v2/auth?" +
                              $"client_id={Uri.EscapeDataString(clientId)}" +
                              $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                              $"&response_type={responseType}" +
                              $"&scope={Uri.EscapeDataString(scope)}" +
                              $"&state={Uri.EscapeDataString(state)}" +
                              $"&access_type=offline" +
                              $"&prompt=consent";

            Console.WriteLine($"Redirecting to Google OAuth: {googleAuthUrl}");
            
            return Redirect(googleAuthUrl);
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            return await ProcessGoogleCallback();
        }

        private async Task<IActionResult> ProcessGoogleCallback()
        {
            try
            {
                Console.WriteLine($"=== OAuth Callback Debug ===");
                Console.WriteLine($"Query String: {Request.QueryString}");
                Console.WriteLine($"Headers: {string.Join(", ", Request.Headers.Select(h => $"{h.Key}={h.Value}"))}");
                Console.WriteLine($"Cookies: {string.Join(", ", Request.Cookies.Select(c => $"{c.Key}={c.Value}"))}");
                Console.WriteLine($"State Parameter: {Request.Query["state"]}");
                Console.WriteLine($"Code Parameter: {Request.Query["code"]}");
                Console.WriteLine($"Error Parameter: {Request.Query["error"]}");
                Console.WriteLine($"Error Description: {Request.Query["error_description"]}");
                Console.WriteLine($"=== End Debug ===");

                // Check for OAuth errors first
                var error = Request.Query["error"].ToString();
                var errorDescription = Request.Query["error_description"].ToString();
                
                if (!string.IsNullOrEmpty(error))
                {
                    Console.WriteLine($"Google OAuth Error: {error} - {errorDescription}");
                    return BadRequest(new { 
                        message = $"Google authentication failed: {error}",
                        errorDescription = errorDescription
                    });
                }

                // Check if we have the required parameters
                var state = Request.Query["state"].ToString();
                var code = Request.Query["code"].ToString();
                
                if (string.IsNullOrEmpty(code))
                {
                    Console.WriteLine("No authorization code received from Google");
                    return BadRequest(new { 
                        message = "No authorization code received from Google.",
                        details = "The OAuth flow was not completed properly."
                    });
                }

                // Verify state parameter
                var storedState = Request.Cookies["MoneyCare.OAuth.State"];
                Console.WriteLine($"Stored State: {storedState}");
                Console.WriteLine($"Received State: {state}");
                
                if (string.IsNullOrEmpty(storedState) || storedState != state)
                {
                    Console.WriteLine($"State mismatch. Expected: {storedState}, Received: {state}");
                    return BadRequest(new { 
                        message = "Invalid OAuth state parameter.",
                        details = "The OAuth state validation failed. Please try again."
                    });
                }

                Console.WriteLine("State validation successful, proceeding with token exchange...");

                // Exchange authorization code for access token
                var clientId = _configuration["Authentication:Google:ClientId"];
                var clientSecret = _configuration["Authentication:Google:ClientSecret"];
                var redirectUri = $"{Request.Scheme}://{Request.Host}/api/auth/google-callback";

                Console.WriteLine($"Starting token exchange...");
                Console.WriteLine($"Client ID: {clientId?.Substring(0, 20)}...");
                Console.WriteLine($"Redirect URI: {redirectUri}");

                using (var httpClient = new HttpClient())
                {
                    var tokenRequest = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("client_id", clientId),
                        new KeyValuePair<string, string>("client_secret", clientSecret),
                        new KeyValuePair<string, string>("code", code),
                        new KeyValuePair<string, string>("grant_type", "authorization_code"),
                        new KeyValuePair<string, string>("redirect_uri", redirectUri)
                    });

                    Console.WriteLine($"Making token request to Google...");
                    var tokenResponse = await httpClient.PostAsync("https://oauth2.googleapis.com/token", tokenRequest);
                    var tokenContent = await tokenResponse.Content.ReadAsStringAsync();
                    
                    Console.WriteLine($"Token Response Status: {tokenResponse.StatusCode}");
                    Console.WriteLine($"Token Response: {tokenContent}");

                    if (!tokenResponse.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Token exchange failed: {tokenContent}");
                        return BadRequest(new { 
                            message = "Failed to exchange authorization code for access token.",
                            details = tokenContent
                        });
                    }

                    Console.WriteLine("Token exchange successful, parsing response...");

                    // Parse the token response
                    var tokenData = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(tokenContent);
                    var accessToken = tokenData["access_token"].ToString();

                    Console.WriteLine($"Access token received, fetching user info...");

                    // Get user info using the access token
                    httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                    var userInfoResponse = await httpClient.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");
                    var userInfoContent = await userInfoResponse.Content.ReadAsStringAsync();

                    Console.WriteLine($"User Info Response Status: {userInfoResponse.StatusCode}");
                    Console.WriteLine($"User Info Response: {userInfoContent}");

                    if (!userInfoResponse.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Failed to get user info: {userInfoContent}");
                        return BadRequest(new { 
                            message = "Failed to retrieve user information from Google.",
                            details = userInfoContent
                        });
                    }

                    Console.WriteLine("User info retrieved successfully, parsing...");

                    // Parse user info
                    var userInfo = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(userInfoContent);
                    var email = userInfo["email"].ToString();
                    var name = userInfo.ContainsKey("name") ? userInfo["name"].ToString() : "Google User";

                    Console.WriteLine($"User Email: {email}");
                    Console.WriteLine($"User Name: {name}");

                    if (string.IsNullOrEmpty(email))
                        return BadRequest(new { message = "Email not provided by Google." });

                    Console.WriteLine("Processing user login/registration...");

                    var user = await _authService.GetUserByEmailAsync(email);
                    var isNewUser = false;

                    if (user == null)
                    {
                        // Create new user from Google OAuth
                        Console.WriteLine("Creating new user from Google OAuth...");
                        user = new mstUser
                        {
                            strGUID = Guid.NewGuid().ToString(),
                            strName = name ?? "Google User",
                            strEmailId = email,
                            bolsActive = true,
                            strPassword = _authService.HashPassword(Guid.NewGuid().ToString()), // Hash random password for OAuth users
                            strOTP = "000000", // Default OTP for OAuth users
                            OtpExpiretIme = DateTime.UtcNow.AddHours(24), // OTP expires in 24 hours
                            createDate = DateTime.UtcNow,
                            ModifyDate = DateTime.UtcNow
                        };
                        _context.mstUsers.Add(user);
                        await _context.SaveChangesAsync();
                        isNewUser = true;
                        Console.WriteLine($"New user created with GUID: {user.strGUID}");
                    }
                    else
                    {
                        Console.WriteLine($"Existing user found with GUID: {user.strGUID}");
                    }

                    Console.WriteLine("Generating JWT token...");
                    var token = _authService.GenerateJwtToken(user);
                    
                    // Clear the OAuth state cookie
                    Response.Cookies.Delete("MoneyCare.OAuth.State", new CookieOptions
                    {
                        Path = "/",
                        SameSite = SameSiteMode.None
                    });

                    Console.WriteLine("OAuth process completed successfully!");

                    // Redirect to success page with token and user info
                    var userInfoDTO = new UserReadDTO
                    {
                        strGUID = user.strGUID,
                        strName = user.strName,
                        strEmailId = user.strEmailId,
                        bolsActive = user.bolsActive,
                        createDate = user.createDate,
                        ModifyDate = user.ModifyDate,
                        AuthProvider = "google"
                    };

                    var responseData = new AuthResponseDTO
                    {
                        Token = token,
                        User = userInfoDTO,
                        AuthProvider = "google",
                        IsNewUser = isNewUser,
                        Message = isNewUser ? "Account created successfully with Google!" : "Login successful with Google!"
                    };

                    // For API calls, return JSON. For browser redirects, redirect to success page
                    var acceptHeader = Request.Headers["Accept"].ToString();
                    if (acceptHeader.Contains("application/json"))
                    {
                        Console.WriteLine("Returning JSON response for API call");
                        return Ok(responseData);
                    }

                    // Try HTTPS first, then fallback to HTTP
                    var frontendUrl = "https://localhost:3000";
                    Console.WriteLine($"Redirecting to frontend with token: {token.Substring(0, 50)}...");
                    Console.WriteLine($"Frontend URL: {frontendUrl}");
                    
                    return Redirect($"{frontendUrl}/oauth-callback?token={token}&provider=google&isNewUser={isNewUser}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"OAuth callback exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(new { 
                    message = "Error processing Google authentication",
                    error = ex.Message,
                    details = ex.StackTrace
                });
            }
        }



        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok(new { message = "Logged out successfully." });
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            var redirectUri = $"{Request.Scheme}://{Request.Host}/api/auth/google-callback";
            
            return Ok(new { 
                message = "Backend is running successfully!",
                timestamp = DateTime.UtcNow,
                googleClientId = clientId?.Substring(0, 20) + "...",
                googleClientSecret = !string.IsNullOrEmpty(_configuration["Authentication:Google:ClientSecret"]),
                callbackPath = "/api/auth/google-callback",
                baseUrl = $"{Request.Scheme}://{Request.Host}",
                redirectUri = redirectUri,
                oauthUrl = $"https://accounts.google.com/o/oauth2/v2/auth?client_id={clientId}&redirect_uri={Uri.EscapeDataString(redirectUri)}&response_type=code&scope=openid%20email%20profile",
                cookies = Request.Cookies.Select(c => new { c.Key, c.Value }).ToList(),
                headers = Request.Headers.Select(h => new { h.Key, Value = h.Value.ToString() }).ToList()
            });
        }

        [HttpGet("test-oauth")]
        public IActionResult TestOAuth()
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            var clientSecret = _configuration["Authentication:Google:ClientSecret"];
            var redirectUri = $"{Request.Scheme}://{Request.Host}/api/auth/google-callback";
            
            return Ok(new { 
                message = "OAuth Configuration Test",
                timestamp = DateTime.UtcNow,
                googleClientId = !string.IsNullOrEmpty(clientId) ? $"{clientId.Substring(0, 20)}..." : "NOT SET",
                googleClientSecret = !string.IsNullOrEmpty(clientSecret) ? "SET" : "NOT SET",
                callbackPath = "/api/auth/google-callback",
                baseUrl = $"{Request.Scheme}://{Request.Host}",
                redirectUri = redirectUri,
                oauthUrl = $"https://accounts.google.com/o/oauth2/v2/auth?client_id={clientId}&redirect_uri={Uri.EscapeDataString(redirectUri)}&response_type=code&scope=openid%20email%20profile",
                cookies = Request.Cookies.Select(c => new { c.Key, c.Value }).ToList(),
                headers = Request.Headers.Select(h => new { h.Key, Value = h.Value.ToString() }).ToList(),
                note = "Using custom OAuth implementation - no built-in middleware"
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshRequestDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token is required." });

            var storedToken = await _authService.GetRefreshTokenAsync(dto.RefreshToken);
            if (storedToken == null)
                return Unauthorized(new { message = "Invalid or expired refresh token." });

            var user = _context.mstUsers.FirstOrDefault(u => u.strGUID == storedToken.UserGuid);
            if (user == null)
                return Unauthorized(new { message = "User not found for this refresh token." });

            // Invalidate the old refresh token
            await _authService.InvalidateRefreshTokenAsync(storedToken);

            // Issue new tokens
            var newJwt = _authService.GenerateJwtToken(user);
            var newRefresh = await _authService.GenerateRefreshTokenAsync(user.strGUID);

            return Ok(new TokenResponseDTO
            {
                Token = newJwt,
                RefreshToken = newRefresh.Token,
                User = new UserReadDTO
                {
                    strGUID = user.strGUID,
                    strName = user.strName,
                    strEmailId = user.strEmailId,
                    bolsActive = user.bolsActive,
                    createDate = user.createDate,
                    ModifyDate = user.ModifyDate,
                    AuthProvider = "email"
                },
                AuthProvider = "email",
                IsNewUser = false,
                Message = "Token refreshed successfully!"
            });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var user = _context.mstUsers.Find(userId);
            if (user == null)
                return NotFound();

            return Ok(new UserReadDTO
            {
                strGUID = user.strGUID,
                strName = user.strName,
                strEmailId = user.strEmailId,
                bolsActive = user.bolsActive,
                createDate = user.createDate,
                ModifyDate = user.ModifyDate,
                AuthProvider = "email" // You might want to store this in the database
            });
        }

        [HttpPost("link-oauth")]
        public async Task<IActionResult> LinkOAuthAccount([FromBody] OAuthLinkDTO linkDto)
        {
            if (linkDto == null)
                return BadRequest(new { message = "Link data is required." });

            // Validate existing user credentials
            var user = await _authService.ValidateUserAsync(linkDto.Email, linkDto.Password);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            // Here you would typically link the OAuth account to the existing user
            // For now, we'll just return a success message
            return Ok(new { 
                message = $"OAuth account linking initiated for {linkDto.OAuthProvider}",
                note = "Complete the OAuth flow to link your account"
            });
        }
    }
} 