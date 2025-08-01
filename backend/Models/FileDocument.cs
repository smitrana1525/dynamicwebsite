using System;

namespace MoneyCareBackend.Models
{
    public class FileDocument
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int? CircularId { get; set; } // Optional foreign key to Circular
        public int? OtherFileId { get; set; } // Optional foreign key to OtherFile
        public string FileName { get; set; }
        public string DisplayName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public bool IsActive { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string UploadedBy { get; set; } // User GUID
        public string ModifiedBy { get; set; } // User GUID
        
        // Navigation properties
        public virtual FileCategory Category { get; set; }
        public virtual Circular? Circular { get; set; }
        public virtual OtherFile? OtherFile { get; set; }
        public virtual ICollection<FileDownload> Downloads { get; set; }
    }
} 