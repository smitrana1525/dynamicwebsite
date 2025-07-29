# Google OAuth Setup Guide

## 🔧 Fixing the "oauth state was missing or invalid" Error

This error typically occurs when Google OAuth credentials are not properly configured. Follow these steps to fix it:

## Step 1: Google Cloud Console Setup

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### 2. Create or Select a Project
- Click on the project dropdown at the top
- Click "New Project" or select an existing project
- Give it a name like "MoneyCare OAuth"

### 3. Enable Google+ API
- Go to "APIs & Services" > "Library"
- Search for "Google+ API" or "Google Identity"
- Click on it and click "Enable"

### 4. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"

### 5. Configure OAuth Consent Screen
- Choose "External" user type
- Fill in the required information:
  - App name: "MoneyCare"
  - User support email: Your email
  - Developer contact information: Your email
- Add scopes: `email`, `profile`, `openid`
- Add test users if needed

### 6. Create OAuth 2.0 Client ID
- Application type: "Web application"
- Name: "MoneyCare Web Client"
- **Authorized JavaScript origins:**
  ```
  http://localhost:3000
  https://localhost:3000
  ```
- **Authorized redirect URIs:**
  ```
  https://localhost:7222/api/auth/google-callback
  https://localhost:7222/signin-google
  http://localhost:7222/api/auth/google-callback
  http://localhost:7222/signin-google
  ```

### 7. Copy Credentials
- Copy the **Client ID** and **Client Secret**
- Update your `appsettings.json`:

```json
{
  "Authentication": {
    "Google": {
      "ClientId": "YOUR_CLIENT_ID_HERE",
      "ClientSecret": "YOUR_CLIENT_SECRET_HERE"
    }
  }
}
```

## Step 2: Test the Configuration

### 1. Restart the Backend
```bash
cd backend
dotnet run
```

### 2. Test the OAuth Flow
- Open: https://localhost:7222/oauth-test.html
- Click "Test Backend Status" to verify configuration
- Click "Test Google OAuth" to test the flow

### 3. Check for Common Issues

#### Issue: "redirect_uri_mismatch"
- **Solution**: Make sure the redirect URI in Google Console exactly matches your callback URL
- **Check**: https://localhost:7222/api/auth/google-callback

#### Issue: "invalid_client"
- **Solution**: Verify Client ID and Client Secret are correct in appsettings.json
- **Check**: No extra spaces or characters

#### Issue: "oauth state was missing or invalid"
- **Solution**: This is usually fixed by proper cookie configuration (already done)
- **Check**: Make sure you're using HTTPS for localhost

## Step 3: Frontend Integration

### 1. Test from Frontend
- Start your React app: `npm start`
- Go to: http://localhost:3000
- Click "Login with Google"

### 2. Check Network Tab
- Open browser developer tools
- Go to Network tab
- Look for any failed requests to `/api/auth/google` or `/api/auth/google-callback`

## Step 4: Troubleshooting

### Common Error Messages:

1. **"The oauth state was missing or invalid"**
   - ✅ Fixed by updating cookie configuration
   - ✅ Make sure Google OAuth credentials are correct

2. **"redirect_uri_mismatch"**
   - ❌ Redirect URI in Google Console doesn't match your callback URL
   - ✅ Add both HTTP and HTTPS versions to Google Console

3. **"invalid_client"**
   - ❌ Client ID or Client Secret is incorrect
   - ✅ Double-check credentials in appsettings.json

4. **"access_denied"**
   - ❌ User denied permission
   - ✅ This is normal user behavior

### Debug Steps:

1. **Check Backend Logs**
   ```bash
   cd backend
   dotnet run
   # Look for authentication errors in console
   ```

2. **Test Backend Directly**
   ```bash
   curl -X GET "https://localhost:7222/api/auth/test"
   ```

3. **Check Google Console**
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Verify OAuth 2.0 Client ID settings
   - Check if redirect URIs are correct

4. **Browser Developer Tools**
   - Open Network tab
   - Look for failed requests
   - Check for CORS errors

## Step 5: Production Setup

When deploying to production:

1. **Update Redirect URIs in Google Console:**
   ```
   https://yourdomain.com/api/auth/google-callback
   https://yourdomain.com/signin-google
   ```

2. **Update appsettings.json:**
   ```json
   {
     "Authentication": {
       "Google": {
         "ClientId": "PRODUCTION_CLIENT_ID",
         "ClientSecret": "PRODUCTION_CLIENT_SECRET"
       }
     }
   }
   ```

3. **Update CORS in Program.cs:**
   ```csharp
   policy.WithOrigins("https://yourdomain.com")
   ```

## ✅ Success Indicators

When everything is working correctly:

1. ✅ Backend test endpoint returns success
2. ✅ Google OAuth redirects properly
3. ✅ User is redirected back with a token
4. ✅ Frontend receives the token and logs in successfully
5. ✅ User appears in the dashboard

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check the test page**: https://localhost:7222/oauth-test.html
2. **Verify Google Console settings**
3. **Check browser console for errors**
4. **Ensure both backend and frontend are running**
5. **Try clearing browser cookies and cache**

The most common issue is incorrect redirect URIs in Google Console. Make sure they exactly match your callback URLs! 