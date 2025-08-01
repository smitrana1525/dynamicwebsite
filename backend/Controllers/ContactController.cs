using Microsoft.AspNetCore.Mvc;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Services;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // Submit contact form (public endpoint)
        [HttpPost]
        public async Task<IActionResult> SubmitContact([FromBody] ContactCreateDTO contactDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(contactDto.Name) || 
                    string.IsNullOrWhiteSpace(contactDto.Email) || 
                    string.IsNullOrWhiteSpace(contactDto.Subject) || 
                    string.IsNullOrWhiteSpace(contactDto.Message))
                {
                    return BadRequest(new { message = "Name, Email, Subject, and Message are required" });
                }

                // Validate email format
                if (!IsValidEmail(contactDto.Email))
                {
                    return BadRequest(new { message = "Invalid email format" });
                }

                var userIP = Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                var userAgent = Request.Headers["User-Agent"].ToString();

                var contact = await _contactService.CreateContactAsync(contactDto, userIP, userAgent);

                return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, new { 
                    message = "Contact form submitted successfully", 
                    contact = contact 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to submit contact form", error = ex.Message });
            }
        }

        // Get all contacts (admin only)
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            try
            {
                var contacts = await _contactService.GetAllContactsAsync();
                var unreadCount = await _contactService.GetUnreadCountAsync();

                return Ok(new { 
                    contacts = contacts, 
                    unreadCount = unreadCount,
                    totalCount = contacts.Count 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch contacts", error = ex.Message });
            }
        }

        // Get contact by ID (admin only)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            try
            {
                var contact = await _contactService.GetContactByIdAsync(id);
                if (contact == null)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to fetch contact", error = ex.Message });
            }
        }

        // Mark contact as read (admin only)
        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id, [FromBody] ContactMarkReadDTO markReadDto)
        {
            try
            {
                var success = await _contactService.MarkContactAsReadAsync(id, markReadDto.ReadBy);
                if (!success)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                return Ok(new { message = "Contact marked as read" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to mark contact as read", error = ex.Message });
            }
        }

        // Reply to contact (admin only)
        [HttpPost("{id}/reply")]
        public async Task<IActionResult> ReplyToContact(int id, [FromBody] ContactReplyDTO replyDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(replyDto.ReplyMessage))
                {
                    return BadRequest(new { message = "Reply message is required" });
                }

                replyDto.ContactId = id;
                var success = await _contactService.ReplyToContactAsync(replyDto);
                if (!success)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                return Ok(new { message = "Reply sent successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send reply", error = ex.Message });
            }
        }

        // Delete contact (admin only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var success = await _contactService.DeleteContactAsync(id);
                if (!success)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                return Ok(new { message = "Contact deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to delete contact", error = ex.Message });
            }
        }

        // Get unread count (admin only)
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            try
            {
                var count = await _contactService.GetUnreadCountAsync();
                return Ok(new { unreadCount = count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to get unread count", error = ex.Message });
            }
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
} 