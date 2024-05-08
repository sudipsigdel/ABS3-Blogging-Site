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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CommentDto comment) {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            
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

            var commentHistory = new CommentHistory()
            {

                CommentId = comments.Id,
                Text = comment.Text,
                UpdatedAt = DateTime.Now,
            };
                _context.Comments.Add(comments);
            _context.Histories.Add(commentHistory);
                await _context.SaveChangesAsync();
                return Ok();
            

        
        }


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
                    return Unauthorized();
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
                IsDownVote = false
            };
            _context.Reactions.Add(CommentReaction);
            await _context.SaveChangesAsync();
            return Ok();
            

        }

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
                    return Unauthorized();
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
                IsDownVote = true
            };
            _context.Reactions.Add(CommentReaction);
            await _context.SaveChangesAsync();
            return Ok();

        }
        [Authorize]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditComment(int id, CommentDto commentData)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            if(comment.UserId == int.Parse(userId))
            {
                return Unauthorized();
            }

            comment.Text = commentData.Text;
            comment.IsEdited = true;
            comment.UpdatedAt = DateTime.Now;

            var CommentHistory = new CommentHistory()
            {
                Text = commentData.Text,
                CommentId = id,
                UpdatedAt = DateTime.Now,

            };
            _context.Histories.Add(CommentHistory);
            await _context.SaveChangesAsync();
            return Ok();
        }

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
    }
}

