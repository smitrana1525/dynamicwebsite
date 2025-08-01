using Microsoft.AspNetCore.Mvc;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Services;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PublicFileController : ControllerBase
    {
        private readonly IFileManagementService _fileService;

        public PublicFileController(IFileManagementService fileService)
        {
            _fileService = fileService;
        }

        // Get all active categories
        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _fileService.GetAllCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve categories", error = ex.Message });
            }
        }

        // Get category with documents
        [HttpGet("categories/{id}/documents")]
        public async Task<IActionResult> GetCategoryWithDocuments(int id)
        {
            try
            {
                var categoryWithDocuments = await _fileService.GetCategoryWithDocumentsAsync(id);
                return Ok(categoryWithDocuments);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve category documents", error = ex.Message });
            }
        }

        // Get documents by category ID
        [HttpGet("documents")]
        public async Task<IActionResult> GetDocuments([FromQuery] int? categoryId)
        {
            try
            {
                List<FileDocumentReadDTO> documents;
                if (categoryId.HasValue)
                {
                    documents = await _fileService.GetDocumentsByCategoryAsync(categoryId.Value);
                }
                else
                {
                    // If no category specified, get all documents from all categories
                    var categories = await _fileService.GetAllCategoriesAsync();
                    var allDocuments = new List<FileDocumentReadDTO>();
                    foreach (var category in categories.Where(c => c.IsActive))
                    {
                        var categoryDocuments = await _fileService.GetDocumentsByCategoryAsync(category.Id);
                        allDocuments.AddRange(categoryDocuments);
                    }
                    documents = allDocuments;
                }
                
                return Ok(documents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to retrieve documents", error = ex.Message });
            }
        }

        // Show document (view in browser)
        [HttpGet("documents/{id}/show")]
        public async Task<IActionResult> ShowDocument(int id)
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
            catch (FileNotFoundException)
            {
                return NotFound(new { message = "File not found on server" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to show document", error = ex.Message });
            }
        }

        // Download document
        [HttpGet("documents/{id}/download")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            try
            {
                var document = await _fileService.GetDocumentByIdAsync(id);
                var filePath = await _fileService.GetDocumentDownloadPathAsync(id);
                
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { message = "File not found on server" });
                }

                var fileName = document.DisplayName + Path.GetExtension(document.FileName);
                var contentType = GetContentType(Path.GetExtension(document.FileName));
                
                // Record the download
                var userGuid = "anonymous"; // For public downloads
                var userIP = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
                
                await _fileService.RecordDownloadAsync(new FileDownloadDTO
                {
                    DocumentId = id,
                    UserGuid = userGuid,
                    UserIP = userIP,
                    UserAgent = userAgent
                });

                return PhysicalFile(filePath, contentType, fileName);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (FileNotFoundException)
            {
                return NotFound(new { message = "File not found on server" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to download document", error = ex.Message });
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
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
        }
    }
} 