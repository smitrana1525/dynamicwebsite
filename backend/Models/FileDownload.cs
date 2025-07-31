using System;

namespace MoneyCareBackend.Models
{
    public class FileDownload
    {
        public int Id { get; set; }
        public int DocumentId { get; set; }
        public string UserGuid { get; set; }
        public DateTime DownloadDate { get; set; }
        public string UserIP { get; set; }
        public string UserAgent { get; set; }
        
        // Navigation properties
        public virtual FileDocument Document { get; set; }
        public virtual mstUser User { get; set; }
    }
} 