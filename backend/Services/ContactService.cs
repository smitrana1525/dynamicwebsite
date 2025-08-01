using Microsoft.EntityFrameworkCore;
using MoneyCareBackend.Data;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Models;
using MoneyCareBackend.Services;

namespace MoneyCareBackend.Services
{
    public interface IContactService
    {
        Task<ContactReadDTO> CreateContactAsync(ContactCreateDTO contactDto, string userIP, string userAgent);
        Task<List<ContactReadDTO>> GetAllContactsAsync();
        Task<ContactReadDTO?> GetContactByIdAsync(int id);
        Task<bool> MarkContactAsReadAsync(int contactId, string readBy);
        Task<bool> ReplyToContactAsync(ContactReplyDTO replyDto);
        Task<int> GetUnreadCountAsync();
        Task<bool> DeleteContactAsync(int id);
    }

    public class ContactService : IContactService
    {
        private readonly MoneyCareDbContext _context;
        private readonly IEmailService _emailService;

        public ContactService(MoneyCareDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<ContactReadDTO> CreateContactAsync(ContactCreateDTO contactDto, string userIP, string userAgent)
        {
            var contact = new Contact
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Subject = contactDto.Subject,
                Message = contactDto.Message,
                Phone = contactDto.Phone,
                Source = contactDto.Source ?? "website",
                UserIP = userIP,
                UserAgent = userAgent,
                CreatedDate = DateTime.UtcNow,
                IsRead = false,
                IsReplied = false
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            // Send notification email to admin
            await SendAdminNotificationEmail(contact);

            // Send confirmation email to user
            await SendUserConfirmationEmail(contact);

            return MapToReadDTO(contact);
        }

        public async Task<List<ContactReadDTO>> GetAllContactsAsync()
        {
            var contacts = await _context.Contacts
                .OrderByDescending(c => c.CreatedDate)
                .ToListAsync();

            return contacts.Select(MapToReadDTO).ToList();
        }

        public async Task<ContactReadDTO?> GetContactByIdAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            return contact != null ? MapToReadDTO(contact) : null;
        }

        public async Task<bool> MarkContactAsReadAsync(int contactId, string readBy)
        {
            var contact = await _context.Contacts.FindAsync(contactId);
            if (contact == null) return false;

            contact.IsRead = true;
            contact.ReadDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ReplyToContactAsync(ContactReplyDTO replyDto)
        {
            var contact = await _context.Contacts.FindAsync(replyDto.ContactId);
            if (contact == null) return false;

            contact.IsReplied = true;
            contact.RepliedDate = DateTime.UtcNow;
            contact.AdminReply = replyDto.ReplyMessage;
            contact.RepliedBy = replyDto.RepliedBy;

            await _context.SaveChangesAsync();

            // Send reply email to user
            await SendUserReplyEmail(contact, replyDto.ReplyMessage);

            return true;
        }

        public async Task<int> GetUnreadCountAsync()
        {
            return await _context.Contacts.CountAsync(c => !c.IsRead);
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null) return false;

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return true;
        }

        private ContactReadDTO MapToReadDTO(Contact contact)
        {
            return new ContactReadDTO
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email,
                Subject = contact.Subject,
                Message = contact.Message,
                Phone = contact.Phone,
                IsRead = contact.IsRead,
                IsReplied = contact.IsReplied,
                CreatedDate = contact.CreatedDate,
                ReadDate = contact.ReadDate,
                RepliedDate = contact.RepliedDate,
                AdminReply = contact.AdminReply,
                RepliedBy = contact.RepliedBy,
                Source = contact.Source,
                UserIP = contact.UserIP,
                UserAgent = contact.UserAgent
            };
        }

        private async Task SendAdminNotificationEmail(Contact contact)
        {
            var subject = $"New Contact Form Submission - {contact.Subject}";
            var body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <div style='background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;'>
                        <h1 style='margin: 0;'>MoneyCare India</h1>
                        <p style='margin: 5px 0 0 0;'>New Contact Form Submission</p>
                    </div>
                    <div style='background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;'>
                        <h2 style='color: #1f2937; margin-top: 0;'>Contact Details</h2>
                        <div style='background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                            <p><strong>Name:</strong> {contact.Name}</p>
                            <p><strong>Email:</strong> <a href='mailto:{contact.Email}' style='color: #2563eb;'>{contact.Email}</a></p>
                            <p><strong>Phone:</strong> {contact.Phone}</p>
                            <p><strong>Subject:</strong> {contact.Subject}</p>
                            <p><strong>Submitted:</strong> {contact.CreatedDate:yyyy-MM-dd HH:mm:ss}</p>
                        </div>
                        <div style='background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                            <h3 style='color: #1f2937; margin-top: 0;'>Message:</h3>
                            <p style='white-space: pre-wrap; margin: 0;'>{contact.Message}</p>
                        </div>
                        <div style='text-align: center; margin-top: 30px;'>
                            <a href='https://localhost:3000/admin/contacts' style='background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;'>View in Dashboard</a>
                        </div>
                    </div>
                </div>
            ";

            await _emailService.SendEmailAsync("smit.rana@moneycareindia.com", subject, body);
        }

        private async Task SendUserConfirmationEmail(Contact contact)
        {
            var subject = "Thank you for contacting MoneyCare India";
            var body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <div style='background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;'>
                        <h1 style='margin: 0;'>MoneyCare India</h1>
                        <p style='margin: 5px 0 0 0;'>Thank you for contacting us!</p>
                    </div>
                    <div style='background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;'>
                        <p>Dear <strong>{contact.Name}</strong>,</p>
                        <p>Thank you for reaching out to MoneyCare India. We have successfully received your message and our team will review it shortly.</p>
                        
                        <div style='background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                            <h3 style='color: #1f2937; margin-top: 0;'>Your Message Details:</h3>
                            <p><strong>Subject:</strong> {contact.Subject}</p>
                            <p><strong>Message:</strong></p>
                            <div style='background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 10px 0;'>
                                <p style='white-space: pre-wrap; margin: 0;'>{contact.Message}</p>
                            </div>
                            <p><strong>Submitted:</strong> {contact.CreatedDate:yyyy-MM-dd HH:mm:ss}</p>
                        </div>
                        
                        <p>We typically respond within 24-48 hours during business days. If you have any urgent inquiries, please feel free to call us directly.</p>
                        
                        <div style='background-color: #d1fae5; border: 1px solid #059669; border-radius: 8px; padding: 15px; margin: 20px 0;'>
                            <p style='margin: 0; color: #065f46;'><strong>Reference Number:</strong> CONT-{contact.Id:D6}</p>
                        </div>
                        
                        <p>Best regards,<br><strong>MoneyCare India Team</strong></p>
                    </div>
                </div>
            ";

            await _emailService.SendEmailAsync(contact.Email, subject, body);
        }

        private async Task SendUserReplyEmail(Contact contact, string adminReply)
        {
            var subject = $"Re: {contact.Subject} - MoneyCare India";
            var body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <div style='background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;'>
                        <h1 style='margin: 0;'>MoneyCare India</h1>
                        <p style='margin: 5px 0 0 0;'>Response to your inquiry</p>
                    </div>
                    <div style='background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;'>
                        <p>Dear <strong>{contact.Name}</strong>,</p>
                        <p>Thank you for contacting MoneyCare India. Here is our response to your inquiry:</p>
                        
                        <div style='background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                            <h3 style='color: #1f2937; margin-top: 0;'>Original Message:</h3>
                            <p><strong>Subject:</strong> {contact.Subject}</p>
                            <div style='background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 10px 0;'>
                                <p style='white-space: pre-wrap; margin: 0;'>{contact.Message}</p>
                            </div>
                        </div>
                        
                        <div style='background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0;'>
                            <h3 style='color: #1f2937; margin-top: 0;'>Our Response:</h3>
                            <div style='white-space: pre-wrap;'>{adminReply}</div>
                        </div>
                        
                        <div style='background-color: #d1fae5; border: 1px solid #059669; border-radius: 8px; padding: 15px; margin: 20px 0;'>
                            <p style='margin: 0; color: #065f46;'><strong>Reference Number:</strong> CONT-{contact.Id:D6}</p>
                        </div>
                        
                        <p>If you have any further questions or need additional assistance, please don't hesitate to contact us again.</p>
                        
                        <p>Best regards,<br><strong>MoneyCare India Team</strong></p>
                    </div>
                </div>
            ";

            await _emailService.SendEmailAsync(contact.Email, subject, body);
        }
    }
} 