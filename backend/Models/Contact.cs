using System;

namespace MoneyCareBackend.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public bool IsReplied { get; set; } = false;
        public DateTime CreatedDate { get; set; }
        public DateTime? ReadDate { get; set; }
        public DateTime? RepliedDate { get; set; }
        public string? AdminReply { get; set; }
        public string? RepliedBy { get; set; }
        public string? Source { get; set; } // Optional field for tracking
        public string UserIP { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;
    }
} 