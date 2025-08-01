using Microsoft.AspNetCore.Mvc;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Services;
using System.ComponentModel.DataAnnotations;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CircularController : ControllerBase
    {
        private readonly IFileManagementService _fileService;

        public CircularController(IFileManagementService fileService)
        {
            _fileService = fileService;
        }

        // Get all circulars (documents from a specific category)
        [HttpGet]
        public async Task<IActionResult> GetAllCirculars()
        {
            try
            {
                // Get circulars category dynamically
                var categories = await _fileService.GetAllCategoriesAsync();
                var circularsCategory = categories.FirstOrDefault(c => c.Name == "Important Circulars");
                
                if (circularsCategory == null)
                {
                    return Ok(new List<CircularDTO>()); // Return empty list if no circulars category
                }
                
                var circulars = await _fileService.GetDocumentsByCategoryAsync(circularsCategory.Id);
                
                // Map to circular format
                var circularDtos = circulars.Select(doc => new CircularDTO
                {
                    Id = doc.Id,
                    Subject = doc.Circular?.Subject,
                    Title = doc.DisplayName,
                    Description = doc.Circular?.Description ?? doc.DisplayName,
                    FileName = doc.FileName,
                    DisplayName = doc.DisplayName,
                    FileType = doc.FileType,
                    FileSize = doc.FileSize,
                    UploadDate = doc.UploadDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    IsActive = doc.IsActive,
                    DownloadCount = doc.DownloadCount
                }).Where(c => c.IsActive).OrderByDescending(c => c.UploadDate).ToList();

                return Ok(circularDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve circulars", error = ex.Message });
            }
        }

        // Get circular by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCircular(int id)
        {
            try
            {
                var document = await _fileService.GetDocumentByIdAsync(id);
                
                if (document == null)
                {
                    return NotFound(new { message = "Circular not found" });
                }

                var circularDto = new CircularDTO
                {
                    Id = document.Id,
                    Subject = document.Circular?.Subject,
                    Title = document.DisplayName,
                    Description = document.Circular?.Description ?? document.DisplayName,
                    FileName = document.FileName,
                    DisplayName = document.DisplayName,
                    FileType = document.FileType,
                    FileSize = document.FileSize,
                    UploadDate = document.UploadDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    IsActive = document.IsActive,
                    DownloadCount = document.DownloadCount
                };

                return Ok(circularDto);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve circular", error = ex.Message });
            }
        }

        // Upload new circular
        [HttpPost]
        public async Task<IActionResult> UploadCircular([FromForm] CircularUploadDTO uploadDto)
        {
            try
            {
                if (uploadDto.File == null || uploadDto.File.Length == 0)
                {
                    return BadRequest(new { message = "No file provided" });
                }

                if (uploadDto.File.Length > 10 * 1024 * 1024) // 10MB limit
                {
                    return BadRequest(new { message = "File size must be less than 10MB" });
                }

                if (!uploadDto.File.ContentType.Equals("application/pdf", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(new { message = "Only PDF files are allowed" });
                }

                // Get circulars category dynamically
                var categories = await _fileService.GetAllCategoriesAsync();
                var circularsCategory = categories.FirstOrDefault(c => c.Name == "Important Circulars");
                
                if (circularsCategory == null)
                {
                    return BadRequest(new { message = "Circulars category not found" });
                }
                
                // Create document in circulars category
                var documentDto = new FileDocumentCreateDTO
                {
                    CategoryId = circularsCategory.Id,
                    DisplayName = uploadDto.Title
                };

                var document = await _fileService.UploadDocumentAsync(documentDto, uploadDto.File, "system");
                
                // Create circular record
                var circular = new Models.Circular
                {
                    Subject = string.IsNullOrEmpty(uploadDto.Subject) ? uploadDto.Title : uploadDto.Subject,
                    Description = uploadDto.Description ?? string.Empty,
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    CreatedBy = "system",
                    ModifiedBy = "system"
                };
                
                // Add circular to context and save
                _fileService.GetDbContext().Circulars.Add(circular);
                await _fileService.GetDbContext().SaveChangesAsync();
                
                // Update document with circular ID
                document.CircularId = circular.Id;
                await _fileService.GetDbContext().SaveChangesAsync();
                
                var circularDto = new CircularDTO
                {
                    Id = document.Id,
                    Subject = circular.Subject,
                    Title = document.DisplayName,
                    Description = circular.Description,
                    FileName = document.FileName,
                    DisplayName = document.DisplayName,
                    FileType = document.FileType,
                    FileSize = document.FileSize,
                    UploadDate = document.UploadDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    IsActive = document.IsActive,
                    DownloadCount = 0
                };

                return CreatedAtAction(nameof(GetCircular), new { id = document.Id }, circularDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to upload circular", error = ex.Message });
            }
        }

        // Delete circular
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCircular(int id)
        {
            try
            {
                await _fileService.DeleteDocumentAsync(id);
                return Ok(new { message = "Circular deleted successfully" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to delete circular", error = ex.Message });
            }
        }

        // Show circular (view in browser)
        [HttpGet("{id}/show")]
        public async Task<IActionResult> ShowCircular(int id)
        {
            try
            {
                var document = await _fileService.GetDocumentByIdAsync(id);
                var filePath = await _fileService.GetDocumentDownloadPathAsync(id);
                
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { message = "File not found on server" });
                }

                var contentType = GetContentType(Path.GetExtension(document.FileName));
                
                // For show action, we don't record download - just display in browser
                return PhysicalFile(filePath, contentType);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to show circular", error = ex.Message });
            }
        }

        // Download circular
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadCircular(int id)
        {
            try
            {
                var document = await _fileService.GetDocumentByIdAsync(id);
                var filePath = await _fileService.GetDocumentDownloadPathAsync(id);
                
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { message = "File not found on server" });
                }

                // Increment download count
                var downloadDto = new FileDownloadDTO
                {
                    DocumentId = id,
                    UserGuid = "anonymous",
                    UserIP = Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                    UserAgent = Request.Headers["User-Agent"].ToString()
                };
                await _fileService.RecordDownloadAsync(downloadDto);

                var fileName = document.DisplayName + Path.GetExtension(document.FileName);
                var contentType = GetContentType(Path.GetExtension(document.FileName));
                
                return PhysicalFile(filePath, contentType, fileName);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to download circular", error = ex.Message });
            }
        }

        private string GetContentType(string fileExtension)
        {
            return fileExtension.ToLower() switch
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

    // DTOs for circular operations
    public class CircularDTO
    {
        public int Id { get; set; }
        public string? Subject { get; set; } // Made nullable
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public long FileSize { get; set; }
        public string UploadDate { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int DownloadCount { get; set; }
    }

    public class CircularUploadDTO
    {
        public string Subject { get; set; } = string.Empty; // Made optional
        
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "File is required")]
        public IFormFile File { get; set; } = null!;
    }
} 