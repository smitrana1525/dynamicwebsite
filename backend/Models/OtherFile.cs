using System.ComponentModel.DataAnnotations;

namespace MoneyCareBackend.Models
{
    public class OtherFile
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string FileType { get; set; } = string.Empty; // "Investor Charter Booking", "Investor Complaint", "AP Branch Details", "KMP Details"
        
        [Required]
        public bool IsActive { get; set; } = true;
        
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? ModifiedDate { get; set; }
        
        [MaxLength(100)]
        public string? CreatedBy { get; set; }
        
        [MaxLength(100)]
        public string? ModifiedBy { get; set; }
        
        // Navigation property to FileDocument
        public int? FileDocumentId { get; set; }
        public virtual FileDocument? FileDocument { get; set; }
    }
} 