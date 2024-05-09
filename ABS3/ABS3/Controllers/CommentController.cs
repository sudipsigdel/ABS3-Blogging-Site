using ABS3.Model;
using ABS3.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }
        //this method is used to post a comment
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CommentDto comment) {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var userName = User.Claims.FirstOrDefault(claim => claim.Type == "UserName")?.Value;
            var blog = _context.Blogs.FirstOrDefault(a => a.Id == comment.Blog);

            
                var comments = new Comment()
                {
                    BlogId = comment.Blog,
                    CreatedAt = DateTime.Now,
                    Text = comment.Text,
                    Score = 0,
                    UserId = int.Parse(userId),
                    IsEdited = false,
                    UpdatedAt = null,
                    UpVoteCount = 0,
                    DownVoteCount = 0
                };
                blog.Score = blog.Score + 1;

                var notification = new Notification()
                {
                    UserId = blog.UserId,
                    NotificationMsg = userName + " has commented on your blog.",
                    CreatedOn = DateTime.Now,
                    IsViewed = false
                };
                _context.Notifications.Add(notification);

            
                _context.Comments.Add(comments);
                await _context.SaveChangesAsync();
                return Ok();
            

        
        }

        //this method is sued to get the comments
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComment(int id)
        {
            var comment =  _context.Comments.Where(u => u.BlogId == id).Include(c => c.User).ToList();
            if (comment.Count == 0)
            {
                return NotFound();
            }
            return comment;
        }
        //this method is used to upvote the comments
        [Authorize]
        [HttpPut("upvote/{id}")]
        public async Task<IActionResult> UpVoteComment(int id)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            var haveLiked = _context.Reactions.FirstOrDefault(u => u.UserId== int.Parse(userId) && u.CommentId== id);
            if (haveLiked != null)
            {
                if (haveLiked.IsDownVote == true)
                {
                    return BadRequest();
                }
                if(haveLiked.IsUpVote == true)
                {
                    comment.UpVoteCount--;
                    comment.Score = comment.Score - 2;

                    haveLiked.IsUpVote = false;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                if(haveLiked.IsUpVote == false )
                {
                    comment.UpVoteCount++;
                    comment.Score = comment.Score+2;
                    haveLiked.IsUpVote = true;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            comment.UpVoteCount++;
            comment.Score = comment.Score + 2;

            var CommentReaction = new CommentReaction()
            {
                UserId = int.Parse(userId),
                CommentId = id,
                IsUpVote = true,
                IsDownVote = false,
                CreatedAt = DateTime.Now
            };
            _context.Reactions.Add(CommentReaction);
            await _context.SaveChangesAsync();
            return Ok();
            

        }
        //this method is used to downvite the comments
        [Authorize]
        [HttpPut("downvote/{id}")]
        public async Task<IActionResult> DownVoteComment(int id)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            var haveLiked = _context.Reactions.FirstOrDefault(u => u.UserId == int.Parse(userId) && u.CommentId == id);
            if (haveLiked != null)
            {
                if (haveLiked.IsUpVote == true)
                {
                    return BadRequest();
                }
                if (haveLiked.IsDownVote == true)
                {
                    comment.DownVoteCount--;
                    comment.Score = comment.Score + 1;

                    haveLiked.IsDownVote = false;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                if (haveLiked.IsDownVote == false)
                {
                    comment.DownVoteCount++;
                    comment.Score = comment.Score -1 ;
                    haveLiked.IsDownVote = true;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            comment.DownVoteCount++;
            comment.Score = comment.Score -1 ;

            var CommentReaction = new CommentReaction()
            {
                UserId = int.Parse(userId),
                CommentId = id,
                IsUpVote = false,
                IsDownVote = true,
                CreatedAt = DateTime.Now
            };
            _context.Reactions.Add(CommentReaction);
            await _context.SaveChangesAsync();
            return Ok();

        }
        //this method ius used to edit the comment
        [Authorize]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditComment(int id, string commentData)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }


            

            var CommentHistory = new CommentHistory()
            {
                Text = comment.Text,
                CommentId = comment.Id,
                UpdatedAt = DateTime.Now,

            };

            comment.Text = commentData;
            comment.IsEdited = true;
            comment.UpdatedAt = DateTime.Now;

            _context.Histories.Add(CommentHistory);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //this method is used to delete thec comment
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = _context.Comments.Where(u => u.Id == id).ToList();
            var commentReaction =  _context.Reactions.Where(u => u.CommentId == id).ToList();
            var CommentHistory = _context.Histories.Where(u=> u.CommentId == id).ToList();
            if(CommentHistory.Count > 0)
            {
                _context.Histories.RemoveRange(CommentHistory);
            }
            if (commentReaction.Count  > 0)
            {
                _context.Reactions.RemoveRange(commentReaction);
            }
            
            
            _context.Comments.RemoveRange(comment);

            await _context.SaveChangesAsync();
            return Ok();
        }
        //this method is used to get thec ocmment edit history.
        [HttpGet("commentedithistory")]
        public async Task<ActionResult<IEnumerable<CommentHistory>>> commentHistory(int id)
        {
            var commentHistory = await _context.Histories.Where(u => u.CommentId == id).ToListAsync();
            return commentHistory;

        }
    }
}

