using Microsoft.EntityFrameworkCore;
using MoneyCareBackend.Data;
using MoneyCareBackend.Models;

namespace MoneyCareBackend.Services
{
    public interface IDataSeedingService
    {
        Task SeedSampleDataAsync();
    }

    public class DataSeedingService : IDataSeedingService
    {
        private readonly MoneyCareDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public DataSeedingService(MoneyCareDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task SeedSampleDataAsync()
        {
            try
            {
                // Check if data already exists
                if (await _context.FileCategories.AnyAsync())
                {
                    Console.WriteLine("Sample data already exists. Checking for Important Circulars category...");
                    
                    // Ensure Important Circulars category exists
                    await EnsureImportantCircularsCategoryExistsAsync();
                    return;
                }

                // Get or create a default user
                var defaultUserGuid = await GetOrCreateDefaultUserAsync();

                // Create sample categories
                var categories = new List<FileCategory>
                {
                    new FileCategory
                    {
                        Name = "Combine KYC Forms",
                        Icon = "FileCheck",
                        IsActive = true,
                        SortOrder = 1,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        CreatedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileCategory
                    {
                        Name = "Other Demat Forms",
                        Icon = "FileText",
                        IsActive = true,
                        SortOrder = 2,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        CreatedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileCategory
                    {
                        Name = "Policies",
                        Icon = "Shield",
                        IsActive = true,
                        SortOrder = 3,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        CreatedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileCategory
                    {
                        Name = "Important Circulars",
                        Icon = "Bell",
                        IsActive = true,
                        SortOrder = 4,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        CreatedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    }
                };

                _context.FileCategories.AddRange(categories);
                await _context.SaveChangesAsync();

                // Create sample documents
                var documents = new List<FileDocument>
                {
                    new FileDocument
                    {
                        CategoryId = categories[0].Id, // KYC Forms
                        FileName = "individual-ckyc-form.pdf",
                        DisplayName = "Individual CKYC Form",
                        FilePath = Path.Combine(_environment.WebRootPath, "uploads", "documents", "sample.pdf"),
                        FileType = ".pdf",
                        FileSize = 245760,
                        IsActive = true,
                        UploadDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        UploadedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileDocument
                    {
                        CategoryId = categories[0].Id, // KYC Forms
                        FileName = "non-individual-ckyc-form.pdf",
                        DisplayName = "Non Individual CKYC Form",
                        FilePath = Path.Combine(_environment.WebRootPath, "uploads", "documents", "sample.pdf"),
                        FileType = ".pdf",
                        FileSize = 198432,
                        IsActive = true,
                        UploadDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        UploadedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileDocument
                    {
                        CategoryId = categories[1].Id, // Demat Forms
                        FileName = "multiple-nomination.pdf",
                        DisplayName = "Multiple Nomination Form",
                        FilePath = Path.Combine(_environment.WebRootPath, "uploads", "documents", "sample.pdf"),
                        FileType = ".pdf",
                        FileSize = 156789,
                        IsActive = true,
                        UploadDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        UploadedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    },
                    new FileDocument
                    {
                        CategoryId = categories[2].Id, // Policies
                        FileName = "granting-exposure-policy.pdf",
                        DisplayName = "Granting of Exposure to Clients",
                        FilePath = Path.Combine(_environment.WebRootPath, "uploads", "documents", "sample.pdf"),
                        FileType = ".pdf",
                        FileSize = 345678,
                        IsActive = true,
                        UploadDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        UploadedBy = defaultUserGuid,
                        ModifiedBy = defaultUserGuid
                    }
                };

                _context.FileDocuments.AddRange(documents);
                await _context.SaveChangesAsync();

                Console.WriteLine("Sample data seeded successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding sample data: {ex.Message}");
                throw;
            }
        }

        private async Task<string> GetOrCreateDefaultUserAsync()
        {
            // Try to get an existing user
            var existingUser = await _context.mstUsers.FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return existingUser.strGUID;
            }

            // Create a default user if none exists
            var defaultUser = new mstUser
            {
                strGUID = Guid.NewGuid().ToString(),
                strName = "Admin User",
                strEmailId = "admin@moneycare.com",
                bolsActive = true,
                strPassword = "hashedpassword", // In production, this should be properly hashed
                createDate = DateTime.UtcNow,
                ModifyDate = DateTime.UtcNow,
                OtpExpiretIme = DateTime.UtcNow,
                strOTP = "000000"
            };

            _context.mstUsers.Add(defaultUser);
            await _context.SaveChangesAsync();

            return defaultUser.strGUID;
        }

        private async Task EnsureImportantCircularsCategoryExistsAsync()
        {
            // Check if Important Circulars category exists
            var circularsCategory = await _context.FileCategories
                .FirstOrDefaultAsync(c => c.Name == "Important Circulars");

            if (circularsCategory == null)
            {
                // Get or create a default user
                var defaultUserGuid = await GetOrCreateDefaultUserAsync();

                // Create the Important Circulars category
                var newCategory = new FileCategory
                {
                    Name = "Important Circulars",
                    Icon = "Bell",
                    IsActive = true,
                    SortOrder = 4,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    CreatedBy = defaultUserGuid,
                    ModifiedBy = defaultUserGuid
                };

                _context.FileCategories.Add(newCategory);
                await _context.SaveChangesAsync();

                Console.WriteLine("Important Circulars category created successfully.");
            }
            else
            {
                Console.WriteLine("Important Circulars category already exists.");
            }

            // Ensure Other Files category exists
            await EnsureOtherFilesCategoryExistsAsync();
        }

        private async Task EnsureOtherFilesCategoryExistsAsync()
        {
            // Check if Other Files category exists
            var otherFilesCategory = await _context.FileCategories
                .FirstOrDefaultAsync(c => c.Name == "Other Files");

            if (otherFilesCategory == null)
            {
                // Get or create a default user
                var defaultUserGuid = await GetOrCreateDefaultUserAsync();

                // Create the Other Files category
                var newCategory = new FileCategory
                {
                    Name = "Other Files",
                    Icon = "FolderOpen",
                    IsActive = true,
                    SortOrder = 5,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    CreatedBy = defaultUserGuid,
                    ModifiedBy = defaultUserGuid
                };

                _context.FileCategories.Add(newCategory);
                await _context.SaveChangesAsync();

                Console.WriteLine("Other Files category created successfully.");
            }
            else
            {
                Console.WriteLine("Other Files category already exists.");
            }
        }
    }
} 