using System.ComponentModel.DataAnnotations;

namespace MoneyCareBackend.DTOs
{
    public class OtherFileDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string FileType { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public FileDocumentReadDTO? FileDocument { get; set; }
    }

    public class OtherFileCreateDTO
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string FileType { get; set; } = string.Empty;
    }

    public class OtherFileUploadDTO
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string FileType { get; set; } = string.Empty;
        
        [Required]
        public IFormFile File { get; set; } = null!;
    }
} 