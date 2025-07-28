# MoneyCare Backend - Enhanced Authentication System

This backend provides a comprehensive authentication system supporting both traditional email/password authentication and OAuth 2.0 (Google, Microsoft, Facebook).

## 🚀 Features

### **Traditional Authentication**
- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ **Secure password hashing with BCrypt**
- ✅ JWT token-based authentication
- ✅ **Refresh token functionality for seamless sessions**
- ✅ **Forgot password with OTP verification**
- ✅ **Password reset functionality**

### **OAuth 2.0 Authentication**
- ✅ Google OAuth
- ✅ Microsoft OAuth
- ✅ Facebook OAuth
- ✅ Automatic user creation for OAuth users
- ✅ Account linking capabilities

### **Security Features**
- ✅ **BCrypt password hashing** (work factor 12)
- ✅ JWT token authentication
- ✅ **Refresh token rotation** (7-day expiry)
- ✅ Password validation
- ✅ OTP generation and verification
- ✅ OTP expiration (10 minutes)
- ✅ Secure password reset flow
- ✅ Protection against timing attacks

### **Access Control**
- ✅ **All models/endpoints accessible after authentication**
- ✅ JWT token required for protected endpoints
- ✅ Secure user management operations
- ✅ Role-based access ready for future expansion

## 🔐 Authentication Flow

### **How It Works:**
1. **User Authentication**: User logs in via `/api/auth/login` or OAuth
2. **Dual Token System**: System returns both JWT token and refresh token
3. **Access to All Models**: With the JWT token, user can access ALL endpoints
4. **Token Refresh**: When JWT expires, use refresh token to get new tokens
5. **Seamless Sessions**: Users stay logged in without re-entering credentials

### **Token Usage:**
```http
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints

### **Authentication Endpoints** (Public)

#### **1. Traditional Registration**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-refresh-token",
  "user": {
    "strGUID": "user-guid",
    "strName": "John Doe",
    "strEmailId": "john@example.com",
    "bolsActive": true,
    "createDate": "2024-01-15T10:00:00Z",
    "modifyDate": "2024-01-15T10:00:00Z",
    "authProvider": "email"
  },
  "authProvider": "email",
  "isNewUser": true,
  "message": "User registered successfully!"
}
```

#### **2. Traditional Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-refresh-token",
  "user": { ... },
  "authProvider": "email",
  "isNewUser": false,
  "message": "Login successful!"
}
```

#### **3. Refresh Token**
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "base64-encoded-refresh-token"
}
```

**Response:**
```json
{
  "token": "new-jwt-token",
  "refreshToken": "new-refresh-token",
  "user": { ... },
  "authProvider": "email",
  "isNewUser": false,
  "message": "Token refreshed successfully!"
}
```

#### **4. Forgot Password**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP has been sent to your email address.",
  "email": "john@example.com",
  "expiresAt": "2024-01-15T10:30:00Z",
  "remainingMinutes": 10,
  "otp": "123456" // Remove this in production!
}
```

#### **5. Verify OTP**
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### **6. Reset Password**
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

#### **7. OAuth Endpoints**
```http
GET /api/auth/google          # Google OAuth login
GET /api/auth/microsoft       # Microsoft OAuth login
GET /api/auth/facebook        # Facebook OAuth login
```

### **Protected Endpoints** (Require JWT Token)

#### **8. User Profile**
```http
GET /api/auth/profile
Authorization: Bearer <jwt-token>
```

#### **9. Logout**
```http
POST /api/auth/logout
Authorization: Bearer <jwt-token>
```

#### **10. Link OAuth Account**
```http
POST /api/auth/link-oauth
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "oAuthProvider": "google"
}
```

### **User Management Endpoints** (Require JWT Token)
```http
GET    /api/user              # Get all users
GET    /api/user/{id}         # Get user by ID
POST   /api/user              # Create user
PUT    /api/user/{id}         # Update user
DELETE /api/user/{id}         # Delete user
```

**Example with JWT Token:**
```bash
curl -X GET "http://localhost:5122/api/user" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔧 Setup Instructions

### **1. Database Setup**
```bash
# Run migrations to create RefreshTokens table
dotnet ef database update
```

### **2. OAuth Configuration**

#### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:5122/api/auth/google-callback`
   - `http://localhost:5122/signin-google`
6. Copy Client ID and Client Secret

#### **Microsoft OAuth**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application
3. Add redirect URI: `http://localhost:5122/api/auth/microsoft-callback`
4. Copy Application (client) ID and create a client secret

#### **Facebook OAuth**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Add OAuth redirect URI: `http://localhost:5122/api/auth/facebook-callback`
5. Copy App ID and App Secret

### **3. Update Configuration**
Edit `appsettings.json`:
```json
{
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-here-make-it-long-and-secure",
    "Issuer": "MoneyCareBackend",
    "Audience": "MoneyCareUsers",
    "ExpirationHours": 24
  },
  "Authentication": {
    "Google": {
      "ClientId": "your-google-client-id",
      "ClientSecret": "your-google-client-secret"
    },
    "Microsoft": {
      "ClientId": "your-microsoft-client-id",
      "ClientSecret": "your-microsoft-client-secret"
    },
    "Facebook": {
      "AppId": "your-facebook-app-id",
      "AppSecret": "your-facebook-app-secret"
    }
  }
}
```

## 🧪 Testing

### **1. Complete Authentication Flow with Refresh Tokens**

#### **Step 1: Register a new user**
```bash
curl -X POST "http://localhost:5122/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Response includes both tokens:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-refresh-token",
  "user": { ... },
  "authProvider": "email",
  "isNewUser": true,
  "message": "User registered successfully!"
}
```

#### **Step 2: Access All Models with JWT Token**
```bash
# Store the tokens
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
REFRESH_TOKEN="base64-encoded-refresh-token"

# Get user profile
curl -X GET "http://localhost:5122/api/auth/profile" \
  -H "Authorization: Bearer $TOKEN"

# Get all users
curl -X GET "http://localhost:5122/api/user" \
  -H "Authorization: Bearer $TOKEN"
```

#### **Step 3: Refresh Token When JWT Expires**
```bash
# When JWT expires, use refresh token to get new tokens
curl -X POST "http://localhost:5122/api/auth/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "'$REFRESH_TOKEN'"
  }'
```

**Response:**
```json
{
  "token": "new-jwt-token",
  "refreshToken": "new-refresh-token",
  "user": { ... },
  "authProvider": "email",
  "isNewUser": false,
  "message": "Token refreshed successfully!"
}
```

#### **Step 4: Continue Using New Tokens**
```bash
# Use the new tokens
NEW_TOKEN="new-jwt-token"
NEW_REFRESH_TOKEN="new-refresh-token"

# Access protected endpoints with new token
curl -X GET "http://localhost:5122/api/user" \
  -H "Authorization: Bearer $NEW_TOKEN"
```

### **2. OAuth Authentication Flow**

#### **Google OAuth**
1. Open browser and navigate to: `http://localhost:5122/api/auth/google`
2. Complete Google OAuth flow
3. You'll be redirected to `/auth-success` with JWT token
4. Use the token to access all endpoints

#### **Using Swagger UI**
1. Open: `http://localhost:5122/swagger`
2. Click "Authorize" button and enter your JWT token
3. Test all endpoints using the interactive interface
4. For OAuth endpoints, use the provided redirect URLs

### **3. Protected Endpoints**
```bash
# Get user profile (requires JWT token)
curl -X GET "http://localhost:5122/api/auth/profile" \
  -H "Authorization: Bearer <your-jwt-token>"

# Get all users (requires JWT token)
curl -X GET "http://localhost:5122/api/user" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 📱 Response Formats

### **Authentication Response (with Refresh Token)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-refresh-token",
  "user": {
    "strGUID": "user-guid",
    "strName": "John Doe",
    "strEmailId": "john@example.com",
    "bolsActive": true,
    "createDate": "2024-01-15T10:00:00Z",
    "modifyDate": "2024-01-15T10:00:00Z",
    "authProvider": "email"
  },
  "authProvider": "email",
  "isNewUser": true,
  "message": "User registered successfully!"
}
```

### **Refresh Token Response**
```json
{
  "token": "new-jwt-token",
  "refreshToken": "new-refresh-token",
  "user": { ... },
  "authProvider": "email",
  "isNewUser": false,
  "message": "Token refreshed successfully!"
}
```

### **OTP Response**
```json
{
  "success": true,
  "message": "OTP has been sent to your email address.",
  "email": "john@example.com",
  "expiresAt": "2024-01-15T10:30:00Z",
  "remainingMinutes": 10,
  "otp": "123456"
}
```

### **User Management Response**
```json
{
  "strGUID": "user-guid",
  "strName": "John Doe",
  "strEmailId": "john@example.com",
  "bolsActive": true,
  "createDate": "2024-01-15T10:00:00Z",
  "modifyDate": "2024-01-15T10:00:00Z",
  "authProvider": "email"
}
```

## 🔒 Security Considerations

### **Password Security**
- **BCrypt Hashing**: All passwords are hashed using BCrypt with work factor 12
- **Salt Generation**: Each password gets a unique salt automatically
- **Timing Attack Protection**: BCrypt provides constant-time comparison
- **Migration Support**: Existing plain-text passwords will need to be updated

### **Token Security**
- **JWT Token**: Short-lived (24 hours by default) for API access
- **Refresh Token**: Long-lived (7 days) for seamless sessions
- **Token Rotation**: Refresh tokens are invalidated and replaced on each use
- **Secure Storage**: Refresh tokens are stored securely in database
- **Automatic Cleanup**: Expired and revoked tokens are handled automatically

### **Access Control**
- **JWT Token Required**: All protected endpoints require valid JWT token
- **Token Expiration**: Tokens expire after configured time (default 24 hours)
- **Secure Headers**: Always use `Authorization: Bearer <token>` header
- **Token Validation**: Server validates token signature, expiration, and claims

### **Production Deployment**
1. **Remove OTP from response**: In production, remove the `otp` field from `OTPResponseDTO`
2. **Email service**: Integrate with email service (SendGrid, AWS SES) for OTP delivery
3. **Rate limiting**: Implement rate limiting for OTP and refresh token requests
4. **Environment variables**: Store sensitive data in environment variables
5. **HTTPS only**: Deploy with HTTPS in production
6. **Secure JWT secret**: Use a strong, randomly generated secret key

### **OTP Security**
- OTP expires after 10 minutes
- OTP is cleared after successful password reset
- OTP is 6 digits for security
- Failed attempts should be limited

### **Password Migration**
If you have existing users with plain-text passwords, you'll need to implement a migration strategy:
1. Check if password is hashed (BCrypt hashes start with `$2a$`, `$2b$`, or `$2y$`)
2. If plain-text, hash it and update the database
3. Consider forcing password reset for security

## 🚀 Running the Application

```bash
# Install dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run

# Access Swagger UI
http://localhost:5122/swagger
```

## 📁 Project Structure

```
backend/
├── Controllers/
│   ├── AuthController.cs      # Authentication endpoints
│   └── UserController.cs      # User management endpoints (protected)
├── DTOs/
│   └── UserDTOs.cs           # Data transfer objects
├── Models/
│   ├── mstUser.cs            # User entity model
│   └── RefreshToken.cs       # Refresh token model
├── Services/
│   └── AuthService.cs        # JWT token & password hashing service
├── Data/
│   └── MoneyCareDbContext.cs # Database context
├── wwwroot/
│   └── auth-success.html     # OAuth success page
└── Program.cs                # Application configuration
```

## 🔧 Troubleshooting

### **Common Issues**

1. **OAuth redirect errors**: Ensure redirect URIs are correctly configured in OAuth providers
2. **Database errors**: Run `dotnet ef database update` to apply migrations
3. **JWT token issues**: Check JWT configuration in `appsettings.json`
4. **OTP not working**: Verify email exists in database and OTP is not expired
5. **Password hashing errors**: Ensure BCrypt.Net-Next package is installed
6. **Unauthorized errors**: Make sure to include `Authorization: Bearer <token>` header
7. **Refresh token errors**: Ensure refresh token is valid and not expired

### **Testing OAuth with Swagger**
- Swagger UI cannot handle OAuth redirects properly
- Use the provided redirect URLs in a browser
- Or use Postman for OAuth testing

### **Token Management**
- **JWT tokens expire after 24 hours** (configurable)
- **Refresh tokens expire after 7 days**
- **Store tokens securely** in your frontend application
- **Implement automatic refresh** logic for seamless user experience
- **Clear tokens on logout** for security

### **Frontend Integration**
```javascript
// Example: Store tokens securely
localStorage.setItem('jwt_token', response.token);
localStorage.setItem('refresh_token', response.refreshToken);

// Example: Use JWT for API calls
fetch('/api/user', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
  }
});

// Example: Refresh token when JWT expires
async function refreshToken() {
  const response = await fetch('/api/auth/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refresh_token')
    })
  });
  
  const data = await response.json();
  localStorage.setItem('jwt_token', data.token);
  localStorage.setItem('refresh_token', data.refreshToken);
}
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Verify configuration settings
3. Test with Swagger UI first
4. Check application logs for detailed error messages
5. Ensure JWT token is included in Authorization header
6. Verify refresh token is valid and not expired

---

**🎉 Your MoneyCare backend now supports comprehensive authentication with secure password hashing, traditional login, OAuth, secure password reset functionality, and refresh token support for seamless user sessions! All models are accessible after authentication with JWT tokens.** 