using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyCareBackend.Data;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Models;
using MoneyCareBackend.Services;
using System.Security.Claims;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtherFileController : ControllerBase
    {
        private readonly MoneyCareDbContext _context;
        private readonly IFileManagementService _fileService;
        private readonly IWebHostEnvironment _environment;

        public OtherFileController(MoneyCareDbContext context, IFileManagementService fileService, IWebHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;
        }

        // GET: api/otherfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OtherFileDTO>>> GetOtherFiles()
        {
            var otherFiles = await _context.OtherFiles
                .Include(o => o.FileDocument)
                .Where(o => o.IsActive)
                .OrderByDescending(o => o.CreatedDate)
                .Select(o => new OtherFileDTO
                {
                    Id = o.Id,
                    Title = o.Title,
                    Description = o.Description,
                    FileType = o.FileType,
                    IsActive = o.IsActive,
                    CreatedDate = o.CreatedDate,
                    ModifiedDate = o.ModifiedDate,
                    CreatedBy = o.CreatedBy,
                    ModifiedBy = o.ModifiedBy,
                    FileDocument = o.FileDocument != null ? new FileDocumentReadDTO
                    {
                        Id = o.FileDocument.Id,
                        CategoryId = o.FileDocument.CategoryId,
                        CategoryName = o.FileDocument.Category.Name,
                        FileName = o.FileDocument.FileName,
                        DisplayName = o.FileDocument.DisplayName,
                        FileType = o.FileDocument.FileType,
                        FileSize = o.FileDocument.FileSize,
                        IsActive = o.FileDocument.IsActive,
                        UploadDate = o.FileDocument.UploadDate,
                        ModifiedDate = o.FileDocument.ModifiedDate,
                        UploadedBy = o.FileDocument.UploadedBy,
                        ModifiedBy = o.FileDocument.ModifiedBy,
                        DownloadCount = o.FileDocument.Downloads.Count,
                        LastDownloaded = o.FileDocument.Downloads.OrderByDescending(d => d.DownloadDate).FirstOrDefault() != null ? o.FileDocument.Downloads.OrderByDescending(d => d.DownloadDate).FirstOrDefault().DownloadDate : (DateTime?)null
                    } : null
                })
                .ToListAsync();

            return Ok(otherFiles);
        }

        // GET: api/otherfile/{fileType}
        [HttpGet("{fileType}")]
        public async Task<ActionResult<IEnumerable<OtherFileDTO>>> GetOtherFilesByType(string fileType)
        {
            var otherFiles = await _context.OtherFiles
                .Include(o => o.FileDocument)
                .Where(o => o.IsActive && o.FileType == fileType)
                .OrderByDescending(o => o.CreatedDate)
                .Select(o => new OtherFileDTO
                {
                    Id = o.Id,
                    Title = o.Title,
                    Description = o.Description,
                    FileType = o.FileType,
                    IsActive = o.IsActive,
                    CreatedDate = o.CreatedDate,
                    ModifiedDate = o.ModifiedDate,
                    CreatedBy = o.CreatedBy,
                    ModifiedBy = o.ModifiedBy,
                    FileDocument = o.FileDocument != null ? new FileDocumentReadDTO
                    {
                        Id = o.FileDocument.Id,
                        CategoryId = o.FileDocument.CategoryId,
                        CategoryName = o.FileDocument.Category.Name,
                        FileName = o.FileDocument.FileName,
                        DisplayName = o.FileDocument.DisplayName,
                        FileType = o.FileDocument.FileType,
                        FileSize = o.FileDocument.FileSize,
                        IsActive = o.FileDocument.IsActive,
                        UploadDate = o.FileDocument.UploadDate,
                        ModifiedDate = o.FileDocument.ModifiedDate,
                        UploadedBy = o.FileDocument.UploadedBy,
                        ModifiedBy = o.FileDocument.ModifiedBy,
                        DownloadCount = o.FileDocument.Downloads.Count,
                        LastDownloaded = o.FileDocument.Downloads.OrderByDescending(d => d.DownloadDate).FirstOrDefault() != null ? o.FileDocument.Downloads.OrderByDescending(d => d.DownloadDate).FirstOrDefault().DownloadDate : (DateTime?)null
                    } : null
                })
                .ToListAsync();

            return Ok(otherFiles);
        }

        // GET: api/otherfile/download/{id}
        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadOtherFile(int id)
        {
            var otherFile = await _context.OtherFiles
                .Include(o => o.FileDocument)
                .FirstOrDefaultAsync(o => o.Id == id && o.IsActive);

            if (otherFile?.FileDocument == null)
                return NotFound("File not found");

            var filePath = Path.Combine(_environment.WebRootPath, otherFile.FileDocument.FilePath);
            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found on server");

            // Record download
            var userGuid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "anonymous";
            var download = new FileDownload
            {
                DocumentId = otherFile.FileDocument.Id,
                UserGuid = userGuid,
                UserIP = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                UserAgent = HttpContext.Request.Headers["User-Agent"].ToString(),
                DownloadDate = DateTime.UtcNow
            };

            _context.FileDownloads.Add(download);
            await _context.SaveChangesAsync();

            var fileName = otherFile.FileDocument.FileName;
            var contentType = GetContentType(fileName);
            return PhysicalFile(filePath, contentType, fileName);
        }

        // GET: api/otherfile/show/{id}
        [HttpGet("show/{id}")]
        public async Task<IActionResult> ShowOtherFile(int id)
        {
            var otherFile = await _context.OtherFiles
                .Include(o => o.FileDocument)
                .FirstOrDefaultAsync(o => o.Id == id && o.IsActive);

            if (otherFile?.FileDocument == null)
                return NotFound("File not found");

            var filePath = Path.Combine(_environment.WebRootPath, otherFile.FileDocument.FilePath);
            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found on server");

            var fileName = otherFile.FileDocument.FileName;
            var contentType = GetContentType(fileName);
            return PhysicalFile(filePath, contentType);
        }

        // POST: api/otherfile/upload
        [HttpPost("upload")]
        public async Task<ActionResult<OtherFileDTO>> UploadOtherFile([FromForm] OtherFileUploadDTO uploadDto)
        {
            if (uploadDto.File == null || uploadDto.File.Length == 0)
                return BadRequest("No file provided");

            // Validate file type
            var allowedFileTypes = new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt" };
            var fileExtension = Path.GetExtension(uploadDto.File.FileName).ToLowerInvariant();
            if (!allowedFileTypes.Contains(fileExtension))
                return BadRequest("Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, and TXT files are allowed.");

            try
            {
                // Get "Other Files" category (should be created by DataSeedingService)
                var otherFilesCategory = await _context.FileCategories
                    .FirstOrDefaultAsync(c => c.Name == "Other Files");

                if (otherFilesCategory == null)
                {
                    return BadRequest("Other Files category not found. Please ensure the application has been properly initialized.");
                }

                // Save file
                var fileName = Guid.NewGuid().ToString() + fileExtension;
                var relativePath = Path.Combine("uploads", "documents", fileName);
                var fullPath = Path.Combine(_environment.WebRootPath, relativePath);

                Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await uploadDto.File.CopyToAsync(stream);
                }

                // Create FileDocument
                var fileDocument = new FileDocument
                {
                    CategoryId = otherFilesCategory.Id,
                    FileName = fileName,
                    DisplayName = uploadDto.Title,
                    FilePath = relativePath,
                    FileType = fileExtension,
                    FileSize = uploadDto.File.Length,
                    IsActive = true,
                    UploadDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    UploadedBy = "admin",
                    ModifiedBy = "admin"
                };

                _context.FileDocuments.Add(fileDocument);
                await _context.SaveChangesAsync();

                // Create OtherFile
                var otherFile = new OtherFile
                {
                    Title = uploadDto.Title,
                    Description = uploadDto.Description,
                    FileType = uploadDto.FileType,
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = "admin",
                    FileDocumentId = fileDocument.Id
                };

                _context.OtherFiles.Add(otherFile);
                await _context.SaveChangesAsync();

                // Update FileDocument with OtherFileId
                fileDocument.OtherFileId = otherFile.Id;
                await _context.SaveChangesAsync();

                var result = new OtherFileDTO
                {
                    Id = otherFile.Id,
                    Title = otherFile.Title,
                    Description = otherFile.Description,
                    FileType = otherFile.FileType,
                    IsActive = otherFile.IsActive,
                    CreatedDate = otherFile.CreatedDate,
                    CreatedBy = otherFile.CreatedBy,
                    FileDocument = new FileDocumentReadDTO
                    {
                        Id = fileDocument.Id,
                        CategoryId = fileDocument.CategoryId,
                        CategoryName = otherFilesCategory.Name,
                        FileName = fileDocument.FileName,
                        DisplayName = fileDocument.DisplayName,
                        FileType = fileDocument.FileType,
                        FileSize = fileDocument.FileSize,
                        IsActive = fileDocument.IsActive,
                        UploadDate = fileDocument.UploadDate,
                        ModifiedDate = fileDocument.ModifiedDate,
                        UploadedBy = fileDocument.UploadedBy,
                        ModifiedBy = fileDocument.ModifiedBy,
                        DownloadCount = 0
                    }
                };

                return CreatedAtAction(nameof(GetOtherFiles), new { id = otherFile.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/otherfile/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOtherFile(int id)
        {
            var otherFile = await _context.OtherFiles
                .Include(o => o.FileDocument)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (otherFile == null)
                return NotFound("Other file not found");

            // Soft delete
            otherFile.IsActive = false;
            otherFile.ModifiedDate = DateTime.UtcNow;
            otherFile.ModifiedBy = "admin";

            if (otherFile.FileDocument != null)
            {
                otherFile.FileDocument.IsActive = false;
                otherFile.FileDocument.ModifiedDate = DateTime.UtcNow;
                otherFile.FileDocument.ModifiedBy = "admin";
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        private string GetContentType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return extension switch
            {
                ".pdf" => "application/pdf",
                ".doc" => "application/msword",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".xls" => "application/vnd.ms-excel",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".txt" => "text/plain",
                _ => "application/octet-stream"
            };
        }
    }
} 