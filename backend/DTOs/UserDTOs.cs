namespace MoneyCareBackend.DTOs
{
    using System.ComponentModel.DataAnnotations;
    public class UserCreateDTO
    {
        [Required(ErrorMessage = "Name is required.")]
        public string? strName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? strEmailId { get; set; }

        [Required(ErrorMessage = "Active status is required.")]
        public bool bolsActive { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string? strPassword { get; set; }

        public string? strOTP { get; set; }
        public DateTime OtpExpiretIme { get; set; }
    }

    public class UserReadDTO
    {
        public string? strGUID { get; set; }
        public string? strName { get; set; }
        public string? strEmailId { get; set; }
        public bool bolsActive { get; set; }
        public DateTime createDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public string? AuthProvider { get; set; } // "email", "google", "microsoft", "facebook"
    }

    public class UserUpdateDTO
    {
        public string? strName { get; set; }
        public string? strEmailId { get; set; }
        public bool bolsActive { get; set; }
        public string? strPassword { get; set; }
        public string? strOTP { get; set; }
        public DateTime OtpExpiretIme { get; set; }
    }

    public class LoginDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
    }

    public class RegisterDTO
    {
        [Required(ErrorMessage = "Name is required.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string? ConfirmPassword { get; set; }
    }

    public class AuthResponseDTO
    {
        public string? Token { get; set; }
        public UserReadDTO? User { get; set; }
        public string? AuthProvider { get; set; }
        public bool IsNewUser { get; set; }
        public string? Message { get; set; }
    }

    public class OAuthLinkDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "OAuth provider is required.")]
        public string? OAuthProvider { get; set; } // "google", "microsoft", "facebook"
    }

    public class ForgotPasswordDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }
    }

    public class VerifyOTPDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "OTP is required.")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "OTP must be exactly 6 characters.")]
        public string? OTP { get; set; }
    }

    public class ResetPasswordDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "OTP is required.")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "OTP must be exactly 6 characters.")]
        public string? OTP { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string? NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [Compare("NewPassword", ErrorMessage = "Passwords do not match.")]
        public string? ConfirmPassword { get; set; }
    }

    public class OTPResponseDTO
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Email { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public int? RemainingMinutes { get; set; }
        public string? OTP { get; set; } // For testing only - remove in production
    }

    public class TokenResponseDTO
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public UserReadDTO? User { get; set; }
        public string? AuthProvider { get; set; }
        public bool IsNewUser { get; set; }
        public string? Message { get; set; }
    }

    public class RefreshRequestDTO
    {
        [Required]
        public string? RefreshToken { get; set; }
    }
}
