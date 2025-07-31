using System;
using System.Collections.Generic;

namespace MoneyCareBackend.Models
{
    public class FileCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; } // Icon name for UI
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedBy { get; set; } // User GUID
        public string ModifiedBy { get; set; } // User GUID
        
        // Navigation properties
        public virtual ICollection<FileDocument> Documents { get; set; }
    }
} 