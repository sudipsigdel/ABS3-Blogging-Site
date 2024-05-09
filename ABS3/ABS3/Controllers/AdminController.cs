using ABS3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace ABS3.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminController(AppDbContext context)
        {
            _context = context;
        }
        //This method is used to count the number of blogs
        [Authorize]
        [HttpGet("Blog")]
        public async Task<int> GetBlogCount()
        {
            return await _context.Blogs.CountAsync();

        }
        //This method is used to get the blog count of a certain month
        [HttpGet("BlogMonth")]
        public async Task<int> GetBlogCountMonth(int id)
        {
            return await _context.Blogs.Where(a => a.CreatedAt.Month == id).CountAsync();
                
            
        }
        //This method is used to get the blogupvote count
        [Authorize]
        [HttpGet("GetBlogUpVote")]
        public async Task<int> GetBlogUpvote()
        {
            return await _context.Blogs.SumAsync(a => a.UpVoteCount );

        }
        //this method is used to get the upvote count of a certain month
        
        [HttpGet("GetBlogUpVoteMonth")]
        public async Task<int> GetBlogUpvoteMonth(int month)
        {
            var commentReaction = await _context.Reactions.Where(a => a.IsUpVote == true && a.CreatedAt.Month == month).CountAsync();
            var BlogReaction = await _context.BlogReactions.Where(a => a.IsUpVote == true && a.CreatedAt.Month == month).CountAsync();
            return commentReaction + BlogReaction;


        }
        //this method is used to get the downvote count of all time
        [Authorize]
        [HttpGet("GetBlogDownVote")]
        public async Task<int> GetBlogDownvote()
        {
            return await _context.Blogs.SumAsync(a => a.DownVoteCount);
        }
        //this method is used to get the downvote of a certain month
        [Authorize]
        [HttpGet("GetBlogDownVoteMonth")]
        public async Task<int> GetBlogDownvoteMonth(int month)
        {
            //return await _context.Blogs.Where(a => a.CreatedAt.Month == month).SumAsync(a => a.DownVoteCount);
            var commentReaction =  await _context.Reactions.Where(a=> a.IsDownVote == true  && a.CreatedAt.Month == month).CountAsync();
            var BlogReaction = await _context.BlogReactions.Where(a => a.IsDownVote == true && a.CreatedAt.Month == month).CountAsync();
            return commentReaction + BlogReaction;
        }
        //this method is used to get the count of comment of all time
        [Authorize]
        [HttpGet("GetCommentCount")]
        public async Task<int> GetCommentCount()
        {
            return await _context.Comments.CountAsync();
        }
        //this method is used to get the comment of a cetain month
        [HttpGet("GetCommentCountMonth")]
        public async Task<int> GetCommentCountMonth(int month)
        {
            return await _context.Comments.Where(a => a.CreatedAt.Month == month).CountAsync();
        }
        //this method is used to get the top blogs of all time
        [HttpGet("TopBlog")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetTopBlog()
        {

            var topBlogs = await _context.Blogs
                .OrderByDescending(b => b.Score)
                .Take(10)
                .ToListAsync();

            if(topBlogs.Count == 0)
            {
                return NotFound();
            }
            return Ok(topBlogs);
        }

        //this method is used to get the top blog of a ceratain month
        [HttpGet("TopBlogMonth")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetTopBlog(int month)
        {

            var topBlogs = await _context.Blogs
                .Where(a => a.CreatedAt.Month == month)
                .OrderByDescending(b => b.Score)
                .Take(10)
                .ToListAsync();

            if (topBlogs.Count == 0)
            {
                return NotFound();
            }
            return Ok(topBlogs);
        }
        //this method us used to get the top user of all time
        [HttpGet("TopUser")]
        public async Task<ActionResult<IEnumerable<User>>> GetTopUser()
        {
            var topUsers = await _context.Users
                .Include(u => u.Blogs) // Include the user's blogs in the query
                .Select(u => new
                {
                    UserId = u.Id,
                    UserName = u.Name,
                    TotalBlogScore = u.Blogs.Sum(b => b.Score)
                })
                .OrderByDescending(u => u.TotalBlogScore)
                .Take(10)
                .ToListAsync();


            if (topUsers.Count == 0)
            {
                return NotFound();
            }
            return Ok(topUsers);
        }
        //This method is used to get the top user of a ceratain months
        [HttpGet("TopUserMonth")]
        public async Task<ActionResult<IEnumerable<User>>> GetTopUserMonth(int month)
        {
            var topUsers = await _context.Users
            .Include(u => u.Blogs) // Include the user's blogs in the query
            .Select(u => new
            {
                UserId = u.Id,
                UserName = u.Name,
                TotalBlogScore = u.Blogs.Where(b => b.CreatedAt.Month == month).Sum(b => b.Score)
            })
            .OrderByDescending(u => u.TotalBlogScore)
            .Take(10) // Limit to the top 10 users
            .ToListAsync();


            if (topUsers.Count == 0)
            {
                return NotFound();
            }
            return Ok(topUsers);
        }
        //this method is used to add aadmin
        [HttpPut("RoleUpdate")]
        public async Task<bool> AddAdmin(string email)
        {
            var user =  _context.Users.FirstOrDefault(u => u.Email == email);
            if(user == null)
            {
                return false;
            }
            user.role = "Admin";
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
