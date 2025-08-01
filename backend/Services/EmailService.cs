using System.Net.Mail;
using System.Net;
using System.Text;

namespace MoneyCareBackend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendOTPEmailAsync(string email, string otp, string userName)
        {
            try
            {
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                var fromEmail = smtpSettings["FromEmail"];
                var fromName = smtpSettings["FromName"];
                var smtpHost = smtpSettings["Host"];
                var smtpPort = int.Parse(smtpSettings["Port"]);
                var smtpUsername = smtpSettings["Username"];
                var smtpPassword = smtpSettings["Password"];
                var enableSsl = bool.Parse(smtpSettings["EnableSsl"]);

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                    EnableSsl = enableSsl
                };

                var subject = "Your OTP for Password Reset - MoneyCare";
                var body = GenerateOTPEmailBody(otp, userName);

                var message = new MailMessage
                {
                    From = new MailAddress(fromEmail, fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(email);

                await client.SendMailAsync(message);
                _logger.LogInformation($"OTP email sent successfully to {email}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send OTP email to {email}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> SendPasswordResetEmailAsync(string email, string userName)
        {
            try
            {
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                var fromEmail = smtpSettings["FromEmail"];
                var fromName = smtpSettings["FromName"];
                var smtpHost = smtpSettings["Host"];
                var smtpPort = int.Parse(smtpSettings["Port"]);
                var smtpUsername = smtpSettings["Username"];
                var smtpPassword = smtpSettings["Password"];
                var enableSsl = bool.Parse(smtpSettings["EnableSsl"]);

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                    EnableSsl = enableSsl
                };

                var subject = "Password Reset Successful - MoneyCare";
                var body = GeneratePasswordResetEmailBody(userName);

                var message = new MailMessage
                {
                    From = new MailAddress(fromEmail, fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(email);

                await client.SendMailAsync(message);
                _logger.LogInformation($"Password reset confirmation email sent successfully to {email}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send password reset email to {email}: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> SendEmailAsync(string email, string subject, string body)
        {
            try
            {
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                var fromEmail = smtpSettings["FromEmail"];
                var fromName = smtpSettings["FromName"];
                var smtpHost = smtpSettings["Host"];
                var smtpPort = int.Parse(smtpSettings["Port"]);
                var smtpUsername = smtpSettings["Username"];
                var smtpPassword = smtpSettings["Password"];
                var enableSsl = bool.Parse(smtpSettings["EnableSsl"]);

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                    EnableSsl = enableSsl
                };

                var message = new MailMessage
                {
                    From = new MailAddress(fromEmail, fromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(email);

                await client.SendMailAsync(message);
                _logger.LogInformation($"Email sent successfully to {email}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send email to {email}: {ex.Message}");
                return false;
            }
        }

        private string GenerateOTPEmailBody(string otp, string userName)
        {
            var html = new StringBuilder();
            html.AppendLine("<!DOCTYPE html>");
            html.AppendLine("<html>");
            html.AppendLine("<head>");
            html.AppendLine("<meta charset='utf-8'>");
            html.AppendLine("<title>OTP for Password Reset</title>");
            html.AppendLine("<style>");
            html.AppendLine("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }");
            html.AppendLine(".container { max-width: 600px; margin: 0 auto; padding: 20px; }");
            html.AppendLine(".header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }");
            html.AppendLine(".content { background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }");
            html.AppendLine(".otp-box { background-color: #ffffff; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }");
            html.AppendLine(".otp-code { font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px; }");
            html.AppendLine(".warning { background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px; padding: 15px; margin: 20px 0; }");
            html.AppendLine(".footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }");
            html.AppendLine("</style>");
            html.AppendLine("</head>");
            html.AppendLine("<body>");
            html.AppendLine("<div class='container'>");
            html.AppendLine("<div class='header'>");
            html.AppendLine("<h1>MoneyCare</h1>");
            html.AppendLine("<p>Password Reset OTP</p>");
            html.AppendLine("</div>");
            html.AppendLine("<div class='content'>");
            html.AppendLine($"<p>Hello {userName},</p>");
            html.AppendLine("<p>You have requested to reset your password for your MoneyCare account.</p>");
            html.AppendLine("<p>Please use the following OTP to complete your password reset:</p>");
            html.AppendLine("<div class='otp-box'>");
            html.AppendLine($"<div class='otp-code'>{otp}</div>");
            html.AppendLine("</div>");
            html.AppendLine("<div class='warning'>");
            html.AppendLine("<p><strong>Important:</strong></p>");
            html.AppendLine("<ul>");
            html.AppendLine("<li>This OTP is valid for 10 minutes only</li>");
            html.AppendLine("<li>Do not share this OTP with anyone</li>");
            html.AppendLine("<li>If you didn't request this password reset, please ignore this email</li>");
            html.AppendLine("</ul>");
            html.AppendLine("</div>");
            html.AppendLine("<p>If you have any questions, please contact our support team.</p>");
            html.AppendLine("<p>Best regards,<br>The MoneyCare Team</p>");
            html.AppendLine("</div>");
            html.AppendLine("<div class='footer'>");
            html.AppendLine("<p>This is an automated email. Please do not reply to this message.</p>");
            html.AppendLine("</div>");
            html.AppendLine("</div>");
            html.AppendLine("</body>");
            html.AppendLine("</html>");

            return html.ToString();
        }

        private string GeneratePasswordResetEmailBody(string userName)
        {
            var html = new StringBuilder();
            html.AppendLine("<!DOCTYPE html>");
            html.AppendLine("<html>");
            html.AppendLine("<head>");
            html.AppendLine("<meta charset='utf-8'>");
            html.AppendLine("<title>Password Reset Successful</title>");
            html.AppendLine("<style>");
            html.AppendLine("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }");
            html.AppendLine(".container { max-width: 600px; margin: 0 auto; padding: 20px; }");
            html.AppendLine(".header { background-color: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }");
            html.AppendLine(".content { background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }");
            html.AppendLine(".success-box { background-color: #d1fae5; border: 1px solid #059669; border-radius: 8px; padding: 20px; margin: 20px 0; }");
            html.AppendLine(".footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }");
            html.AppendLine("</style>");
            html.AppendLine("</head>");
            html.AppendLine("<body>");
            html.AppendLine("<div class='container'>");
            html.AppendLine("<div class='header'>");
            html.AppendLine("<h1>MoneyCare</h1>");
            html.AppendLine("<p>Password Reset Successful</p>");
            html.AppendLine("</div>");
            html.AppendLine("<div class='content'>");
            html.AppendLine($"<p>Hello {userName},</p>");
            html.AppendLine("<div class='success-box'>");
            html.AppendLine("<p><strong>Your password has been successfully reset!</strong></p>");
            html.AppendLine("</div>");
            html.AppendLine("<p>You can now log in to your MoneyCare account using your new password.</p>");
            html.AppendLine("<p>If you did not perform this action, please contact our support team immediately.</p>");
            html.AppendLine("<p>Best regards,<br>The MoneyCare Team</p>");
            html.AppendLine("</div>");
            html.AppendLine("<div class='footer'>");
            html.AppendLine("<p>This is an automated email. Please do not reply to this message.</p>");
            html.AppendLine("</div>");
            html.AppendLine("</div>");
            html.AppendLine("</body>");
            html.AppendLine("</html>");

            return html.ToString();
        }
    }
} 