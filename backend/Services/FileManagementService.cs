using Microsoft.EntityFrameworkCore;
using MoneyCareBackend.Data;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Models;
using System.Security.Claims;

namespace MoneyCareBackend.Services
{
    public interface IFileManagementService
    {
        // Category operations
        Task<FileCategoryReadDTO> CreateCategoryAsync(FileCategoryCreateDTO dto, string userGuid);
        Task<FileCategoryReadDTO> UpdateCategoryAsync(int id, FileCategoryUpdateDTO dto, string userGuid);
        Task<bool> DeleteCategoryAsync(int id);
        Task<List<FileCategoryReadDTO>> GetAllCategoriesAsync();
        Task<FileCategoryReadDTO> GetCategoryByIdAsync(int id);
        Task<CategoryWithDocumentsDTO> GetCategoryWithDocumentsAsync(int id);

        // Document operations
        Task<FileDocumentReadDTO> UploadDocumentAsync(FileDocumentCreateDTO dto, IFormFile file, string userGuid);
        Task<FileDocumentReadDTO> UpdateDocumentAsync(int id, FileDocumentUpdateDTO dto, string userGuid);
        Task<bool> DeleteDocumentAsync(int id);
        Task<List<FileDocumentReadDTO>> GetDocumentsByCategoryAsync(int categoryId);
        Task<FileDocumentReadDTO> GetDocumentByIdAsync(int id);
        Task<string> GetDocumentDownloadPathAsync(int id);

        // Download operations
        Task<bool> RecordDownloadAsync(FileDownloadDTO dto);
        Task<List<FileDownloadHistoryDTO>> GetDownloadHistoryAsync(int? categoryId = null, int? documentId = null);
        Task<List<FileDownloadHistoryDTO>> GetUserDownloadsAsync(string userGuid);
        Task<FileDownloadHistoryDTO> GetDownloadByIdAsync(int id);

        // Statistics
        Task<object> GetDownloadStatisticsAsync();
    }

    public class FileManagementService : IFileManagementService
    {
        private readonly MoneyCareDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileManagementService(
            MoneyCareDbContext context, 
            IWebHostEnvironment environment,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        // Category operations
        public async Task<FileCategoryReadDTO> CreateCategoryAsync(FileCategoryCreateDTO dto, string userGuid)
        {
            // Check for duplicate sort order
            var existingCategory = await _context.FileCategories
                .FirstOrDefaultAsync(c => c.SortOrder == dto.SortOrder);
            
            if (existingCategory != null)
            {
                throw new ArgumentException($"Sort order {dto.SortOrder} is already used by category '{existingCategory.Name}'. Please choose a different sort order.");
            }

            var category = new FileCategory
            {
                Name = dto.Name,
                Icon = dto.Icon,
                IsActive = true,
                SortOrder = dto.SortOrder,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                CreatedBy = userGuid,
                ModifiedBy = userGuid
            };

            _context.FileCategories.Add(category);
            await _context.SaveChangesAsync();

            return await GetCategoryByIdAsync(category.Id);
        }

        public async Task<FileCategoryReadDTO> UpdateCategoryAsync(int id, FileCategoryUpdateDTO dto, string userGuid)
        {
            var category = await _context.FileCategories.FindAsync(id);
            if (category == null)
                throw new ArgumentException("Category not found");

            // Check for duplicate sort order (excluding current category)
            var existingCategory = await _context.FileCategories
                .FirstOrDefaultAsync(c => c.SortOrder == dto.SortOrder && c.Id != id);
            
            if (existingCategory != null)
            {
                throw new ArgumentException($"Sort order {dto.SortOrder} is already used by category '{existingCategory.Name}'. Please choose a different sort order.");
            }

            category.Name = dto.Name;
            category.Icon = dto.Icon;
            category.IsActive = dto.IsActive;
            category.SortOrder = dto.SortOrder;
            category.ModifiedDate = DateTime.UtcNow;
            category.ModifiedBy = userGuid;

            await _context.SaveChangesAsync();

            return await GetCategoryByIdAsync(category.Id);
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.FileCategories.FindAsync(id);
            if (category == null)
                return false;

            _context.FileCategories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<FileCategoryReadDTO>> GetAllCategoriesAsync()
        {
            return await _context.FileCategories
                .Where(c => c.IsActive)
                .OrderBy(c => c.SortOrder)
                .ThenBy(c => c.Name)
                .Select(c => new FileCategoryReadDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Icon = c.Icon,
                    IsActive = c.IsActive,
                    SortOrder = c.SortOrder,
                    CreatedDate = c.CreatedDate,
                    ModifiedDate = c.ModifiedDate,
                    CreatedBy = c.CreatedBy,
                    ModifiedBy = c.ModifiedBy,
                    DocumentCount = c.Documents.Count(d => d.IsActive)
                })
                .ToListAsync();
        }

        public async Task<FileCategoryReadDTO> GetCategoryByIdAsync(int id)
        {
            var category = await _context.FileCategories
                .Where(c => c.Id == id)
                .Select(c => new FileCategoryReadDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Icon = c.Icon,
                    IsActive = c.IsActive,
                    SortOrder = c.SortOrder,
                    CreatedDate = c.CreatedDate,
                    ModifiedDate = c.ModifiedDate,
                    CreatedBy = c.CreatedBy,
                    ModifiedBy = c.ModifiedBy,
                    DocumentCount = c.Documents.Count(d => d.IsActive)
                })
                .FirstOrDefaultAsync();

            if (category == null)
                throw new ArgumentException("Category not found");

            return category;
        }

        public async Task<CategoryWithDocumentsDTO> GetCategoryWithDocumentsAsync(int id)
        {
            var category = await _context.FileCategories
                .Where(c => c.Id == id && c.IsActive)
                .Select(c => new CategoryWithDocumentsDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Icon = c.Icon,
                    IsActive = c.IsActive,
                    SortOrder = c.SortOrder,
                    Documents = c.Documents
                        .Where(d => d.IsActive)
                        .Select(d => new FileDocumentReadDTO
                        {
                            Id = d.Id,
                            CategoryId = d.CategoryId,
                            CategoryName = c.Name,
                            FileName = d.FileName,
                            DisplayName = d.DisplayName,
                            FileType = d.FileType,
                            FileSize = d.FileSize,
                            IsActive = d.IsActive,
                            UploadDate = d.UploadDate,
                            ModifiedDate = d.ModifiedDate,
                            UploadedBy = d.UploadedBy,
                            ModifiedBy = d.ModifiedBy,
                            DownloadCount = d.Downloads.Count,
                            LastDownloaded = d.Downloads.OrderByDescending(dl => dl.DownloadDate).FirstOrDefault().DownloadDate
                        })
                        .OrderBy(d => d.DisplayName)
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (category == null)
                throw new ArgumentException("Category not found");

            return category;
        }

        // Document operations
        public async Task<FileDocumentReadDTO> UploadDocumentAsync(FileDocumentCreateDTO dto, IFormFile file, string userGuid)
        {
            // Validate category exists
            var category = await _context.FileCategories.FindAsync(dto.CategoryId);
            if (category == null)
                throw new ArgumentException("Category not found");

            // Create upload directory
            var uploadPath = Path.Combine(_environment.WebRootPath, "uploads", "documents");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // Generate unique filename
            var fileExtension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadPath, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create document record
            var document = new FileDocument
            {
                CategoryId = dto.CategoryId,
                FileName = fileName,
                DisplayName = dto.DisplayName,
                FilePath = filePath,
                FileType = fileExtension.ToLowerInvariant(),
                FileSize = file.Length,
                IsActive = true,
                UploadDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                UploadedBy = userGuid,
                ModifiedBy = userGuid
            };

            _context.FileDocuments.Add(document);
            await _context.SaveChangesAsync();

            return await GetDocumentByIdAsync(document.Id);
        }

        public async Task<FileDocumentReadDTO> UpdateDocumentAsync(int id, FileDocumentUpdateDTO dto, string userGuid)
        {
            var document = await _context.FileDocuments.FindAsync(id);
            if (document == null)
                throw new ArgumentException("Document not found");

            document.DisplayName = dto.DisplayName;
            document.IsActive = dto.IsActive;
            document.ModifiedDate = DateTime.UtcNow;
            document.ModifiedBy = userGuid;

            await _context.SaveChangesAsync();

            return await GetDocumentByIdAsync(document.Id);
        }

        public async Task<bool> DeleteDocumentAsync(int id)
        {
            var document = await _context.FileDocuments.FindAsync(id);
            if (document == null)
                return false;

            // Delete physical file
            if (File.Exists(document.FilePath))
                File.Delete(document.FilePath);

            _context.FileDocuments.Remove(document);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<FileDocumentReadDTO>> GetDocumentsByCategoryAsync(int categoryId)
        {
            return await _context.FileDocuments
                .Where(d => d.CategoryId == categoryId && d.IsActive)
                .Select(d => new FileDocumentReadDTO
                {
                    Id = d.Id,
                    CategoryId = d.CategoryId,
                    CategoryName = d.Category.Name,
                    FileName = d.FileName,
                    DisplayName = d.DisplayName,
                    FileType = d.FileType,
                    FileSize = d.FileSize,
                    IsActive = d.IsActive,
                    UploadDate = d.UploadDate,
                    ModifiedDate = d.ModifiedDate,
                    UploadedBy = d.UploadedBy,
                    ModifiedBy = d.ModifiedBy,
                    DownloadCount = d.Downloads.Count,
                    LastDownloaded = d.Downloads.OrderByDescending(dl => dl.DownloadDate).FirstOrDefault().DownloadDate
                })
                .OrderBy(d => d.DisplayName)
                .ToListAsync();
        }

        public async Task<FileDocumentReadDTO> GetDocumentByIdAsync(int id)
        {
            var document = await _context.FileDocuments
                .Where(d => d.Id == id)
                .Select(d => new FileDocumentReadDTO
                {
                    Id = d.Id,
                    CategoryId = d.CategoryId,
                    CategoryName = d.Category.Name,
                    FileName = d.FileName,
                    DisplayName = d.DisplayName,
                    FileType = d.FileType,
                    FileSize = d.FileSize,
                    IsActive = d.IsActive,
                    UploadDate = d.UploadDate,
                    ModifiedDate = d.ModifiedDate,
                    UploadedBy = d.UploadedBy,
                    ModifiedBy = d.ModifiedBy,
                    DownloadCount = d.Downloads.Count,
                    LastDownloaded = d.Downloads.OrderByDescending(dl => dl.DownloadDate).FirstOrDefault().DownloadDate
                })
                .FirstOrDefaultAsync();

            if (document == null)
                throw new ArgumentException("Document not found");

            return document;
        }

        public async Task<string> GetDocumentDownloadPathAsync(int id)
        {
            var document = await _context.FileDocuments.FindAsync(id);
            if (document == null || !document.IsActive)
                throw new ArgumentException("Document not found");

            if (!File.Exists(document.FilePath))
                throw new FileNotFoundException("File not found on disk");

            return document.FilePath;
        }

        // Download operations
        public async Task<bool> RecordDownloadAsync(FileDownloadDTO dto)
        {
            var download = new FileDownload
            {
                DocumentId = dto.DocumentId,
                UserGuid = dto.UserGuid,
                DownloadDate = DateTime.UtcNow,
                UserIP = dto.UserIP,
                UserAgent = dto.UserAgent
            };

            _context.FileDownloads.Add(download);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<FileDownloadHistoryDTO>> GetDownloadHistoryAsync(int? categoryId = null, int? documentId = null)
        {
            var query = _context.FileDownloads
                .Include(d => d.Document)
                .ThenInclude(d => d.Category)
                .Include(d => d.User)
                .AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(d => d.Document.CategoryId == categoryId.Value);

            if (documentId.HasValue)
                query = query.Where(d => d.DocumentId == documentId.Value);

            return await query
                .OrderByDescending(d => d.DownloadDate)
                .Select(d => new FileDownloadHistoryDTO
                {
                    Id = d.Id,
                    DocumentId = d.DocumentId,
                    DocumentName = d.Document.DisplayName,
                    CategoryName = d.Document.Category.Name,
                    UserGuid = d.UserGuid,
                    UserName = d.User.strName,
                    UserEmail = d.User.strEmailId,
                    DownloadDate = d.DownloadDate,
                    UserIP = d.UserIP,
                    UserAgent = d.UserAgent
                })
                .ToListAsync();
        }

        public async Task<List<FileDownloadHistoryDTO>> GetUserDownloadsAsync(string userGuid)
        {
            return await _context.FileDownloads
                .Include(d => d.Document)
                .ThenInclude(d => d.Category)
                .Include(d => d.User)
                .Where(d => d.UserGuid == userGuid)
                .OrderByDescending(d => d.DownloadDate)
                .Select(d => new FileDownloadHistoryDTO
                {
                    Id = d.Id,
                    DocumentId = d.DocumentId,
                    DocumentName = d.Document.DisplayName,
                    CategoryName = d.Document.Category.Name,
                    UserGuid = d.UserGuid,
                    UserName = d.User.strName,
                    UserEmail = d.User.strEmailId,
                    DownloadDate = d.DownloadDate,
                    UserIP = d.UserIP,
                    UserAgent = d.UserAgent
                })
                .ToListAsync();
        }

        public async Task<FileDownloadHistoryDTO> GetDownloadByIdAsync(int id)
        {
            var download = await _context.FileDownloads
                .Include(d => d.Document)
                .ThenInclude(d => d.Category)
                .Include(d => d.User)
                .Where(d => d.Id == id)
                .Select(d => new FileDownloadHistoryDTO
                {
                    Id = d.Id,
                    DocumentId = d.DocumentId,
                    DocumentName = d.Document.DisplayName,
                    CategoryName = d.Document.Category.Name,
                    UserGuid = d.UserGuid,
                    UserName = d.User.strName,
                    UserEmail = d.User.strEmailId,
                    DownloadDate = d.DownloadDate,
                    UserIP = d.UserIP,
                    UserAgent = d.UserAgent
                })
                .FirstOrDefaultAsync();

            if (download == null)
                throw new ArgumentException("Download record not found");

            return download;
        }

        public async Task<object> GetDownloadStatisticsAsync()
        {
            var totalDownloads = await _context.FileDownloads.CountAsync();
            var totalDocuments = await _context.FileDocuments.CountAsync(d => d.IsActive);
            var totalCategories = await _context.FileCategories.CountAsync(c => c.IsActive);

            var recentDownloads = await _context.FileDownloads
                .Where(d => d.DownloadDate >= DateTime.UtcNow.AddDays(-7))
                .CountAsync();

            var topDocuments = await _context.FileDocuments
                .Where(d => d.IsActive)
                .Select(d => new
                {
                    d.DisplayName,
                    d.Category.Name,
                    DownloadCount = d.Downloads.Count
                })
                .OrderByDescending(d => d.DownloadCount)
                .Take(5)
                .ToListAsync();

            return new
            {
                TotalDownloads = totalDownloads,
                TotalDocuments = totalDocuments,
                TotalCategories = totalCategories,
                RecentDownloads = recentDownloads,
                TopDocuments = topDocuments
            };
        }
    }
} 