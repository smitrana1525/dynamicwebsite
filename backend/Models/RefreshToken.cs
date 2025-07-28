using System;

namespace MoneyCareBackend.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string? Token { get; set; }
        public string? UserGuid { get; set; }
        public DateTime Expires { get; set; }
        public bool IsRevoked { get; set; }
        public DateTime Created { get; set; }
        public DateTime? RevokedAt { get; set; }
    }
} 