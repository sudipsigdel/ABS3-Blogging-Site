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
        //this metho dis used to get all the notification
        [Microsoft.AspNetCore.Mvc.HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotification()
        {
            if(_context.Notifications == null)
            {
                return NotFound();
            }
            return await _context.Notifications.ToListAsync();
        }
        //this method is used to get the notification for a user only
        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpGet("User")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotificationUser()
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var notification = await _context.Notifications.Where(u => u.UserId == int.Parse(userId)).OrderByDescending(b => b.CreatedOn).ToListAsync();
            return notification;
        }
        //this method is used mark the comment view.
        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpPut("UserView")]
        public async Task<bool> NotificationView(int id)
        {
            var noti = await _context.Notifications.FindAsync(id);
            if(noti == null)
            {
                return false;
            }
            noti.IsViewed = true;
            await _context.SaveChangesAsync();
            return true;
        }
        //this metho dis used to mark all the comment to view all
        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpPut("ViewAll")]
        public async Task<bool> NotificationAllView()
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var noti = _context.Notifications.Where(u => u.UserId == int.Parse(userId)).ToList();
            foreach (Notification notification in noti)
            {
                notification.IsViewed = true;
            }
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
