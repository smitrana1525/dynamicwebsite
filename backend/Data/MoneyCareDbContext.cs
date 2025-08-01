using Microsoft.EntityFrameworkCore;
using MoneyCareBackend.Models;

namespace MoneyCareBackend.Data
{
    public class MoneyCareDbContext : DbContext
    {
        public MoneyCareDbContext(DbContextOptions<MoneyCareDbContext> options)
            : base(options)
        {
        }

        public DbSet<mstUser> mstUsers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<FileCategory> FileCategories { get; set; }
        public DbSet<FileDocument> FileDocuments { get; set; }
        public DbSet<FileDownload> FileDownloads { get; set; }
        public DbSet<Circular> Circulars { get; set; }
        public DbSet<OtherFile> OtherFiles { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<mstUser>(entity =>
            {
                entity.HasKey(e => e.strGUID);
                entity.Property(e => e.strGUID).HasMaxLength(50);
                entity.Property(e => e.strName).HasMaxLength(100);
                entity.Property(e => e.strEmailId).HasMaxLength(100);
                entity.Property(e => e.strPassword).HasMaxLength(100);
                entity.Property(e => e.strOTP).HasMaxLength(10);
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Token).IsRequired();
                entity.Property(e => e.UserGuid).IsRequired();
                entity.Property(e => e.Expires).IsRequired();
                entity.Property(e => e.Created).IsRequired();
            });

            modelBuilder.Entity<FileCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Icon).HasMaxLength(50);
                entity.Property(e => e.CreatedBy).HasMaxLength(50);
                entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            });

            modelBuilder.Entity<FileDocument>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.DisplayName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.FilePath).IsRequired().HasMaxLength(500);
                entity.Property(e => e.FileType).HasMaxLength(50);
                entity.Property(e => e.UploadedBy).HasMaxLength(50);
                entity.Property(e => e.ModifiedBy).HasMaxLength(50);
                
                entity.HasOne(e => e.Category)
                    .WithMany(c => c.Documents)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(e => e.Circular)
                    .WithOne(c => c.Document)
                    .HasForeignKey<FileDocument>(e => e.CircularId)
                    .OnDelete(DeleteBehavior.SetNull);
                    
                entity.HasOne(e => e.OtherFile)
                    .WithOne(o => o.FileDocument)
                    .HasForeignKey<FileDocument>(e => e.OtherFileId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<FileDownload>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UserGuid).IsRequired().HasMaxLength(50);
                entity.Property(e => e.UserIP).HasMaxLength(45);
                entity.Property(e => e.UserAgent).HasMaxLength(500);
                
                entity.HasOne(e => e.Document)
                    .WithMany(d => d.Downloads)
                    .HasForeignKey(e => e.DocumentId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserGuid)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Circular>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Subject).HasMaxLength(200).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.CreatedBy).HasMaxLength(50);
                entity.Property(e => e.ModifiedBy).HasMaxLength(50);
                entity.Property(e => e.CreatedDate).IsRequired();
                entity.Property(e => e.ModifiedDate).IsRequired();
            });

            modelBuilder.Entity<OtherFile>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.FileType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CreatedBy).HasMaxLength(100);
                entity.Property(e => e.ModifiedBy).HasMaxLength(100);
                entity.Property(e => e.CreatedDate).IsRequired();
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subject).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Message).IsRequired().HasMaxLength(2000);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Source).HasMaxLength(20);
                entity.Property(e => e.UserIP).HasMaxLength(45);
                entity.Property(e => e.UserAgent).HasMaxLength(500);
                entity.Property(e => e.AdminReply).HasMaxLength(2000);
                entity.Property(e => e.RepliedBy).HasMaxLength(100);
                entity.Property(e => e.CreatedDate).IsRequired();
            });
        }
    }
}
