using System;

namespace MoneyCareBackend.Models
{
    public class Circular
    {
        public int Id { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; } = string.Empty; // User GUID
        public string ModifiedBy { get; set; } = string.Empty; // User GUID
        
        // Navigation property
        public virtual FileDocument? Document { get; set; }
    }
} 