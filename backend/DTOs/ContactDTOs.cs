using System;

namespace MoneyCareBackend.DTOs
{
    public class ContactCreateDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Source { get; set; } // Optional field for tracking
    }

    public class ContactReadDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public bool IsReplied { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ReadDate { get; set; }
        public DateTime? RepliedDate { get; set; }
        public string? AdminReply { get; set; }
        public string? RepliedBy { get; set; }
        public string? Source { get; set; }
        public string UserIP { get; set; } = string.Empty;
        public string UserAgent { get; set; } = string.Empty;
    }

    public class ContactReplyDTO
    {
        public int ContactId { get; set; }
        public string ReplyMessage { get; set; } = string.Empty;
        public string RepliedBy { get; set; } = string.Empty;
    }

    public class ContactMarkReadDTO
    {
        public int ContactId { get; set; }
        public string ReadBy { get; set; } = string.Empty;
    }
} 