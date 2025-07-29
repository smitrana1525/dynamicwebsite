# OTP and Password Reset Implementation

## Overview
This document describes the implementation of OTP (One-Time Password) generation, email sending, and password reset functionality in the MoneyCare backend.

## Features Implemented

### 1. OTP Generation and Email Sending
- **OTP Generation**: 6-digit random OTP generated for password reset
- **Email Service**: SMTP-based email service using System.Net.Mail
- **HTML Email Templates**: Professional HTML email templates for OTP and confirmation emails
- **Security**: OTP expires after 10 minutes
- **Logging**: Comprehensive logging for email sending success/failure

### 2. Password Reset Flow
1. **Forgot Password**: User enters email → OTP sent via email
2. **OTP Verification**: User enters 6-digit OTP → Backend verifies
3. **Password Reset**: User enters new password → Password updated in database
4. **Confirmation**: Success email sent to user

### 3. Frontend Integration
- **PasswordReset Component**: Dedicated React component for password reset flow
- **Multi-step Process**: Email → OTP → New Password → Success
- **User Experience**: Countdown timer for OTP resend, loading states, error handling
- **Integration**: Seamlessly integrated with existing Login component

## Backend Implementation

### Email Service (`Services/EmailService.cs`)
```csharp
public interface IEmailService
{
    Task<bool> SendOTPEmailAsync(string email, string otp, string userName);
    Task<bool> SendPasswordResetEmailAsync(string email, string userName);
}
```

### API Endpoints
- `POST /api/auth/forgot-password` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### Configuration
Add SMTP settings to `appsettings.json`:
```json
{
  "SmtpSettings": {
    "FromEmail": "noreply@moneycare.com",
    "FromName": "MoneyCare Support",
    "Host": "smtp.gmail.com",
    "Port": "587",
    "Username": "your-email@gmail.com",
    "Password": "your-app-password",
    "EnableSsl": "true"
  }
}
```

## Frontend Implementation

### PasswordReset Component (`components/PasswordReset.tsx`)
- **4-Step Process**: Email → OTP → New Password → Success
- **Features**:
  - Email validation
  - OTP input with 6-digit limit
  - Password strength validation
  - Password confirmation matching
  - Countdown timer for OTP resend
  - Loading states and error handling
  - Responsive design

### API Integration (`services/api.ts`)
```typescript
async forgotPassword(email: string): Promise<OTPResponse>
async verifyOTP(email: string, otp: string): Promise<{ Success: boolean; Message: string; Email: string }>
async resetPassword(email: string, otp: string, newPassword: string): Promise<{ Success: boolean; Message: string; Email: string; RedirectToLogin?: boolean }>
```

## Security Features

### OTP Security
- **6-digit random OTP**: Generated using `Random.Next(100000, 999999)`
- **10-minute expiration**: OTP expires after 10 minutes
- **Single-use**: OTP is cleared after successful password reset
- **Email-only delivery**: OTP not returned in API response

### Password Security
- **Hashed passwords**: All passwords hashed using BCrypt
- **Password validation**: Minimum 6 characters required
- **Database update**: Password updated with hash, OTP cleared

### Email Security
- **HTML email templates**: Professional, branded email templates
- **Security warnings**: Clear instructions about OTP security
- **No sensitive data in logs**: Email addresses logged, OTP not logged

## Email Templates

### OTP Email Template
- **Subject**: "Your OTP for Password Reset - MoneyCare"
- **Features**:
  - Professional HTML design
  - Large, clear OTP display
  - Security warnings
  - Expiration information
  - Branded with MoneyCare styling

### Password Reset Confirmation Email
- **Subject**: "Password Reset Successful - MoneyCare"
- **Features**:
  - Success confirmation
  - Security reminder
  - Professional design

## Usage Instructions

### For Users
1. Click "Forgot password?" on login page
2. Enter email address
3. Check email for 6-digit OTP
4. Enter OTP in the verification screen
5. Enter new password and confirm
6. Success! Return to login with new password

### For Developers
1. Configure SMTP settings in `appsettings.json`
2. Test email sending with valid SMTP credentials
3. Ensure email service is registered in `Program.cs`
4. Test complete password reset flow

## Error Handling

### Backend Errors
- **Email not found**: Returns 404 with appropriate message
- **Invalid OTP**: Returns 400 with error message
- **Expired OTP**: Returns 400 with expiration message
- **Email sending failure**: Returns 500 with retry message

### Frontend Errors
- **Network errors**: Displayed to user with retry option
- **Validation errors**: Real-time validation feedback
- **API errors**: User-friendly error messages

## Testing

### Backend Testing
1. Test OTP generation and email sending
2. Test OTP verification with valid/invalid OTPs
3. Test password reset with valid OTP
4. Test expired OTP handling

### Frontend Testing
1. Test complete password reset flow
2. Test error scenarios (invalid email, wrong OTP)
3. Test OTP resend functionality
4. Test responsive design on different devices

## Future Enhancements

### Potential Improvements
1. **SMS OTP**: Add SMS-based OTP delivery
2. **Rate limiting**: Implement OTP request rate limiting
3. **Audit logging**: Log password reset attempts
4. **Email templates**: More customizable email templates
5. **Multi-language**: Support for multiple languages

### Security Enhancements
1. **CAPTCHA**: Add CAPTCHA for OTP requests
2. **Device fingerprinting**: Track device for suspicious activity
3. **IP-based blocking**: Block suspicious IP addresses
4. **Account lockout**: Lock account after multiple failed attempts

## Troubleshooting

### Common Issues
1. **Email not received**: Check SMTP settings and spam folder
2. **OTP expired**: Request new OTP
3. **Invalid OTP**: Ensure 6-digit code is entered correctly
4. **Password reset fails**: Check password requirements

### Debug Steps
1. Check backend logs for email sending errors
2. Verify SMTP configuration
3. Test email service independently
4. Check frontend console for API errors 