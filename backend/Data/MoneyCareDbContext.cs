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
        }
    }
}
