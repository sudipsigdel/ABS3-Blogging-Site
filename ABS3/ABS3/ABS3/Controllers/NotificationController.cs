using ABS3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http;

namespace ABS3.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotification()
        {
            if(_context.Notifications == null)
            {
                return NotFound();
            }
            return await _context.Notifications.ToListAsync();
        }
        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpGet("User")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotificationUser()
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var notification = _context.Notifications.Where(u => u.UserId == int.Parse(userId)).ToList();
            return notification;
        }

        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpPut("User")]
        public async Task<bool> NotificationView(int id)
        {
            var noti = _context.Notifications.FirstOrDefault(u => u.Id == id);
            noti.IsViewed = true;
            await _context.SaveChangesAsync();
            return true;
            
        }
    }
}
