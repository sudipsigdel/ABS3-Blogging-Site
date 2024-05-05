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

        [Authorize]
        [HttpGet("Blog")]
        public async Task<int> GetBlogCount()
        {
            return await _context.Blogs.CountAsync();

        }
        
        [HttpGet("BlogMonth")]
        public async Task<int> GetBlogCountMonth(int id)
        {
            return await _context.Blogs.Where(a => a.CreatedAt.Month == id).CountAsync();
                
            
        }

        [Authorize]
        [HttpGet("GetBlogUpVote")]
        public async Task<int> GetBlogUpvote()
        {
            return await _context.Blogs.SumAsync(a => a.UpVoteCount );


        }

        [Authorize]
        [HttpGet("GetBlogUpVoteMonth")]
        public async Task<int> GetBlogUpvoteMonth(int month)
        {
            return await _context.Blogs.Where(a=> a.CreatedAt.Month == month).SumAsync(a => a.UpVoteCount);


        }

        [Authorize]
        [HttpGet("GetBlogDownVote")]
        public async Task<int> GetBlogDownvote()
        {
            return await _context.Blogs.SumAsync(a => a.DownVoteCount);
        }

        [Authorize]
        [HttpGet("GetBlogDownVoteMonth")]
        public async Task<int> GetBlogDownvoteMonth(int month)
        {
            return await _context.Blogs.Where(a => a.CreatedAt.Month == month).SumAsync(a => a.DownVoteCount);
        }

        [Authorize]
        [HttpGet("GetCommentCount")]
        public async Task<int> GetCommentCount()
        {
            return await _context.Comments.CountAsync();
        }

        [HttpGet("GetCommentCountMonth")]
        public async Task<int> GetCommentCountMonth(int month)
        {
            return await _context.Comments.Where(a => a.CreatedAt.Month == month).CountAsync();
        }

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


    }
}
