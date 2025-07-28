using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MoneyCareBackend.Models;
using MoneyCareBackend.Data;
using BCrypt.Net;
using System.Security.Cryptography;

namespace MoneyCareBackend.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(mstUser user);
        Task<mstUser?> ValidateUserAsync(string email, string password);
        Task<mstUser?> GetUserByEmailAsync(string email);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);

        // Refresh token methods
        Task<RefreshToken> GenerateRefreshTokenAsync(string userGuid);
        Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken);
        Task InvalidateRefreshTokenAsync(RefreshToken token);
        Task InvalidateAllUserRefreshTokensAsync(string userGuid);
    }

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly MoneyCareDbContext _context;
        private const int RefreshTokenDays = 7;

        public AuthService(IConfiguration configuration, MoneyCareDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string GenerateJwtToken(mstUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "YourSuperSecretKeyHere12345678901234567890");
            var issuer = jwtSettings["Issuer"] ?? "MoneyCareBackend";
            var audience = jwtSettings["Audience"] ?? "MoneyCareUsers";
            var expirationHours = int.Parse(jwtSettings["ExpirationHours"] ?? "24");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.strGUID),
                    new Claim(ClaimTypes.Email, user.strEmailId),
                    new Claim(ClaimTypes.Name, user.strName),
                    new Claim("UserId", user.strGUID)
                }),
                Expires = DateTime.UtcNow.AddHours(expirationHours),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<mstUser?> ValidateUserAsync(string email, string password)
        {
            var user = await GetUserByEmailAsync(email);
            if (user == null || !user.bolsActive)
                return null;

            // Verify password using BCrypt
            if (VerifyPassword(password, user.strPassword))
                return user;

            return null;
        }

        public async Task<mstUser?> GetUserByEmailAsync(string email)
        {
            return await Task.FromResult(_context.mstUsers.FirstOrDefault(u => u.strEmailId == email));
        }

        public string HashPassword(string password)
        {
            // Hash password using BCrypt with work factor 12
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(12));
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            try
            {
                // Verify password against hash
                return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            }
            catch
            {
                // If verification fails (e.g., invalid hash format), return false
                return false;
            }
        }

        // --- Refresh Token Logic ---
        public async Task<RefreshToken> GenerateRefreshTokenAsync(string userGuid)
        {
            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            var refreshToken = new RefreshToken
            {
                Token = token,
                UserGuid = userGuid,
                Expires = DateTime.UtcNow.AddDays(RefreshTokenDays),
                Created = DateTime.UtcNow,
                IsRevoked = false
            };
            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
            return refreshToken;
        }

        public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken)
        {
            return await Task.FromResult(_context.RefreshTokens.FirstOrDefault(rt => rt.Token == refreshToken && !rt.IsRevoked && rt.Expires > DateTime.UtcNow));
        }

        public async Task InvalidateRefreshTokenAsync(RefreshToken token)
        {
            token.IsRevoked = true;
            token.RevokedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task InvalidateAllUserRefreshTokensAsync(string userGuid)
        {
            var tokens = _context.RefreshTokens.Where(rt => rt.UserGuid == userGuid && !rt.IsRevoked && rt.Expires > DateTime.UtcNow).ToList();
            foreach (var token in tokens)
            {
                token.IsRevoked = true;
                token.RevokedAt = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
        }
    }
} 