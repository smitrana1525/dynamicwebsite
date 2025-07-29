namespace MoneyCareBackend.Services
{
    public interface IEmailService
    {
        Task<bool> SendOTPEmailAsync(string email, string otp, string userName);
        Task<bool> SendPasswordResetEmailAsync(string email, string userName);
    }
} 