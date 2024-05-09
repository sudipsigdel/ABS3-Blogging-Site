using ABS3.DTO;
using ABS3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ABS3.Services;

namespace ABS3.Controllers
{

    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly AppDbContext _context;

        public UserController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        //this method is used to get the data of all the users.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }
        //this method is used to get the user by their id
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserId(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        //this method is used to register the user in the app
        [HttpPost("Register")]
        public async Task<ActionResult<User>> PostUser([FromForm] UserDto user)
        {
            if (user?.ProfileImage == null || user.ProfileImage.Length <= 0)
            {
                return BadRequest("No file was uploaded.");
            }
            if (user.ProfileImage.Length > 3 * 1024 * 1024)
            {
                return BadRequest("File size exceeds the limit of 3MB.");
            }
            string webrootpath = _environment.WebRootPath; 
            string uploadsFolder = Path.Combine(webrootpath, "uploads/users");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(user.ProfileImage.FileName);
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await user.ProfileImage.CopyToAsync(fileStream);
            }

            var passwordHash = Hash.HashPassword(user.Password);

            User userObj = new User()
            {
                Name = user.Name,
                Email = user.Email,
                Password = passwordHash,
                ImagePath = filePath,
                Phone = user.Phone,
                role = user.role
            };


            _context.Users.Add(userObj);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //this method is  used to edit the users details
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutUser( string email, string phone, string name)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var userData = _context.Users.FirstOrDefault(u=> u.Id == int.Parse(userId));
            if(userData == null)
            {
                return NotFound();
            }
            userData.Name = name;
            userData.Phone = phone;
            userData.Email = email;
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool UserAvailable(int id)
        {
            return (_context.Users?.Any(x => x.Id == id)).GetValueOrDefault();
        }
        //this method is used to delete the user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if(_context.Users == null)
            {
                return NotFound();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //this method us sued to change the password
        [Authorize]
        [HttpPut("UserProfilePassword")]
        public async Task<ActionResult> ChangePassword(string currentPassword, string newPassword)
        {
            var currentPasswordHash = Hash.HashPassword(currentPassword);
            var newPasswordHash = Hash.HashPassword(newPassword);
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;

            var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            if(user.Password != currentPasswordHash)
            {
                return BadRequest();
            }
            user.Password = newPasswordHash;
            await _context.SaveChangesAsync();
            return Ok();

            
        }
        //this method is used to deltet the profile
        [Authorize]
        [HttpDelete("DeleteProfile")]
        public async Task<ActionResult> DeleteProfile()
        {

            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var userID = int.Parse(userId);
            var user = _context.Users.FirstOrDefault(u => u.Id == userID);
            var notification =_context.Notifications.Where(u => u.UserId == userID).ToList();
            _context.Notifications.RemoveRange(notification);
            var blog = _context.Blogs.Where(u => u.UserId == userID).ToList();

            foreach (Blog b in blog)
            {
                var blogReaction = _context.BlogReactions.Where(u => u.BlogId == b.Id).ToList();
                var blogHistory = _context.BlogHistories.Where(u => u.BlogId == b.Id).ToList();
                var comment = _context.Comments.Where(u => u.BlogId == b.Id).ToList();
                foreach (Comment c in comment)
                {
                    var commentHistory = _context.Histories.Where(a => a.CommentId == c.Id).ToList();
                    _context.Histories.RemoveRange(commentHistory);
                    var commentReaction = _context.Reactions.Where(a => a.CommentId == c.Id).ToList();
                    _context.Reactions.RemoveRange(commentReaction);
                }
                if (blogHistory.Count > 0)
                {
                    _context.BlogHistories.RemoveRange(blogHistory);
                }
                if (blogReaction.Count > 0)
                {
                    _context.BlogReactions.RemoveRange(blogReaction);
                }
                _context.BlogHistories.RemoveRange(blogHistory);
                _context.BlogReactions.RemoveRange(blogReaction);
            }
            _context.Blogs.RemoveRange(blog);
            _context.Users.Remove(user);
             _context.SaveChangesAsync();
            return Ok("User deleted successfully");



        }
        private int GetCurrentUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == "UserId");

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
            return -1;
        }
        //this method is used to get the current user
        [HttpGet("GetCurrentUser")]
        [Authorize]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            int userId = GetCurrentUserId();
            if (userId == -1)
            {
                return BadRequest("Invalid or missing user ID in the token.");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return user;
        }

        


    }
}
