using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MoneyCareBackend.Models;
using MoneyCareBackend.Data;
using MoneyCareBackend.DTOs;
using MoneyCareBackend.Services;
using System.Linq;

namespace MoneyCareBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // All endpoints require authentication
    public class UserController : ControllerBase
    {
        private readonly MoneyCareDbContext _context;
        private readonly IAuthService _authService;

        public UserController(MoneyCareDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // Create
        [HttpPost]
        public IActionResult CreateUser([FromBody] UserCreateDTO userDto)
        {
            if (userDto == null)
                return BadRequest(new { message = "User data is required." });

            // Check for duplicate email
            if (_context.mstUsers.Any(u => u.strEmailId == userDto.strEmailId))
                return Conflict(new { message = "Email ID already exists." });

            var user = new mstUser
            {
                strGUID = Guid.NewGuid().ToString(),
                strName = userDto.strName,
                strEmailId = userDto.strEmailId,
                bolsActive = userDto.bolsActive,
                strPassword = _authService.HashPassword(userDto.strPassword), // Hash the password
                strOTP = userDto.strOTP ?? "000000",
                OtpExpiretIme = userDto.OtpExpiretIme,
                createDate = DateTime.UtcNow,
                ModifyDate = DateTime.UtcNow
            };

            _context.mstUsers.Add(user);
            _context.SaveChanges();

            var readDto = new UserReadDTO
            {
                strGUID = user.strGUID,
                strName = user.strName,
                strEmailId = user.strEmailId,
                bolsActive = user.bolsActive,
                createDate = user.createDate,
                ModifyDate = user.ModifyDate,
                AuthProvider = "email"
            };

            return CreatedAtAction(nameof(GetUser), new { id = user.strGUID }, readDto);
        }

        // Read (Get by Id)
        [HttpGet("{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _context.mstUsers.Find(id);
            if (user == null)
                return NotFound(new { message = "User not found." });

            var readDto = new UserReadDTO
            {
                strGUID = user.strGUID,
                strName = user.strName,
                strEmailId = user.strEmailId,
                bolsActive = user.bolsActive,
                createDate = user.createDate,
                ModifyDate = user.ModifyDate,
                AuthProvider = "email"
            };
            return Ok(readDto);
        }

        // Read (Get all)
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.mstUsers
                .Select(user => new UserReadDTO
                {
                    strGUID = user.strGUID,
                    strName = user.strName,
                    strEmailId = user.strEmailId,
                    bolsActive = user.bolsActive,
                    createDate = user.createDate,
                    ModifyDate = user.ModifyDate,
                    AuthProvider = "email"
                })
                .ToList();
            return Ok(users);
        }

        // Update
        [HttpPut("{id}")]
        public IActionResult UpdateUser(string id, [FromBody] UserUpdateDTO updatedDto)
        {
            if (updatedDto == null)
                return BadRequest(new { message = "Update data is required." });

            var user = _context.mstUsers.Find(id);
            if (user == null)
                return NotFound(new { message = "User not found." });

            user.strName = updatedDto.strName ?? user.strName;
            user.strEmailId = updatedDto.strEmailId ?? user.strEmailId;
            user.bolsActive = updatedDto.bolsActive;
            
            // Only hash password if it's being updated
            if (!string.IsNullOrEmpty(updatedDto.strPassword))
            {
                user.strPassword = _authService.HashPassword(updatedDto.strPassword);
            }
            
            user.ModifyDate = DateTime.UtcNow;
            user.OtpExpiretIme = updatedDto.OtpExpiretIme;
            user.strOTP = updatedDto.strOTP ?? user.strOTP;

            _context.SaveChanges();

            var readDto = new UserReadDTO
            {
                strGUID = user.strGUID,
                strName = user.strName,
                strEmailId = user.strEmailId,
                bolsActive = user.bolsActive,
                createDate = user.createDate,
                ModifyDate = user.ModifyDate,
                AuthProvider = "email"
            };
            return Ok(readDto);
        }

        // Delete
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _context.mstUsers.Find(id);
            if (user == null)
                return NotFound(new { message = "User not found." });

            _context.mstUsers.Remove(user);
            _context.SaveChanges();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
