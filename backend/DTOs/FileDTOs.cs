using System.ComponentModel.DataAnnotations;

namespace MoneyCareBackend.DTOs
{
    public class FileCategoryCreateDTO
    {
        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public string Name { get; set; }

        [StringLength(50, ErrorMessage = "Icon name cannot exceed 50 characters.")]
        public string Icon { get; set; } = "FileCheck";

        [Required(ErrorMessage = "Sort order is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Sort order must be greater than 0.")]
        public int SortOrder { get; set; }
    }

    public class FileCategoryUpdateDTO
    {
        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public string Name { get; set; }

        [StringLength(50, ErrorMessage = "Icon name cannot exceed 50 characters.")]
        public string Icon { get; set; }

        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
    }

    public class FileCategoryReadDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public int DocumentCount { get; set; }
    }

    public class FileDocumentCreateDTO
    {
        [Required(ErrorMessage = "Category ID is required.")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Display name is required.")]
        [StringLength(255, ErrorMessage = "Display name cannot exceed 255 characters.")]
        public string DisplayName { get; set; }
    }

    public class FileDocumentUpdateDTO
    {
        [Required(ErrorMessage = "Display name is required.")]
        [StringLength(255, ErrorMessage = "Display name cannot exceed 255 characters.")]
        public string DisplayName { get; set; }

        public bool IsActive { get; set; }
    }

    public class FileDocumentReadDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string FileName { get; set; }
        public string DisplayName { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public bool IsActive { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string UploadedBy { get; set; }
        public string ModifiedBy { get; set; }
        public int DownloadCount { get; set; }
        public DateTime? LastDownloaded { get; set; }
    }

    public class FileDownloadDTO
    {
        public int DocumentId { get; set; }
        public string UserGuid { get; set; }
        public string UserIP { get; set; }
        public string UserAgent { get; set; }
    }

    public class FileDownloadHistoryDTO
    {
        public int Id { get; set; }
        public int DocumentId { get; set; }
        public string DocumentName { get; set; }
        public string CategoryName { get; set; }
        public string UserGuid { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime DownloadDate { get; set; }
        public string UserIP { get; set; }
        public string UserAgent { get; set; }
    }

    public class CategoryWithDocumentsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public List<FileDocumentReadDTO> Documents { get; set; } = new List<FileDocumentReadDTO>();
    }
} 