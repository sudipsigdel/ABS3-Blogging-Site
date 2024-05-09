using ABS3.DTO;
using ABS3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ABS3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public BlogController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        [Route("GetBlogs")]
        public async Task<ActionResult<IEnumerable<BlogDisplayDTO>>> GetBlogs()
        {
            var blogs = await _context.Blogs
        .Include(b => b.User) // Include the User navigation property
        .ToListAsync();


            var blogDtos = blogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name, // Assuming User has a Name property
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });

            return Ok(blogDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogsId(int id)
        {
            var blog = _context.Blogs.Where(u => u.Id == id).Include(c => c.User).ToList();
            if (blog.Count == 0)
            {
                return NotFound();
            }
            return blog;

        }

        /*  [Authorize]
          [HttpPost]
          [Route("CreateBlog")]
          public async Task<IActionResult> AddBlog([FromForm] BlogDto model)
          {
              var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == "UserId");

              if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
              {
                  return BadRequest("User is not authenticated or user ID is missing.");
              }

              if (model == null)
              {
                  return BadRequest("Invalid Submission!");
              }

              if (!int.TryParse(userIdClaim.Value, out var userId))
              {
                  return BadRequest("Invalid user ID format.");
              }

              var blog = new Blog
              {
                  Title = model.Title,
                  Content = model.Content,
                  Category = model.Category,
                  CreatedOn = DateTime.Now.ToString(),
                  UserId = userId,
                  IsEdited = false,
                  UpVoteCount = 0,
                  DownVoteCount = 0
              };

              _context.Blogs.Add(blog);
              await _context.SaveChangesAsync();

              var lastBlogId = blog.Id;

              if (model.BlogImage != null && model.BlogImage.Length > 0)
              {
                  var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

                  if (!Directory.Exists(directoryPath))
                  {
                      Directory.CreateDirectory(directoryPath);
                  }

                  string fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.BlogImage.FileName);

                  string filePath = Path.Combine(directoryPath, fileName);

                  using (FileStream stream = new FileStream(filePath, FileMode.Create))
                  {
                      await model.BlogImage.CopyToAsync(stream);
                  }

                  var BlogImageModel = new ImageDto
                  {
                      BlogImageID = lastBlogId,
                      ImageName = fileName,
                      ImagePath = filePath
                  };

                  _context.Add(BlogImageModel);
              }

              await _context.SaveChangesAsync();

              return Ok(model);


          }
  */
        [Authorize]
        [HttpPut("upvote/{id}")]
        public async Task<IActionResult> BlogUpvote(int id)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var userName = User.Claims.FirstOrDefault(claim => claim.Type == "UserName")?.Value;
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            var haveLiked = _context.BlogReactions.FirstOrDefault(u => u.UserId == int.Parse(userId) && u.BlogId == id);
            if (haveLiked != null)
            {
                if (haveLiked.IsDownVote == true)
                {
                    return Unauthorized();
                }
                if (haveLiked.IsUpVote == true)
                {
                    blog.UpVoteCount--;
                    blog.Score = blog.Score - 2;

                    haveLiked.IsUpVote = false;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                if (haveLiked.IsUpVote == false)
                {
                    blog.UpVoteCount++;
                    blog.Score = blog.Score + 2;
                    haveLiked.IsUpVote = true;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            blog.UpVoteCount++;
            blog.Score = blog.Score + 2;

            var BlogReaction = new BlogReaction()
            {
                UserId = int.Parse(userId),
                BlogId = id,
                IsUpVote = true,
                IsDownVote = false
            };

            var notification = new Notification()
            {
                UserId = blog.UserId,
                NotificationMsg = userName + " has Liked on your blog.",
                CreatedOn = DateTime.Now,
                IsViewed = false
            };
            _context.Notifications.Add(notification);


            _context.BlogReactions.Add(BlogReaction);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPut("downvote/{id}")]
        public async Task<IActionResult> DownVoteBlog(int id)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            var haveLiked = _context.BlogReactions.FirstOrDefault(u => u.UserId == int.Parse(userId) && u.BlogId == id);
            if (haveLiked != null)
            {
                if (haveLiked.IsUpVote == true)
                {
                    return Unauthorized();
                }
                if (haveLiked.IsDownVote == true)
                {
                    blog.DownVoteCount--;
                    blog.Score = blog.Score + 1;

                    haveLiked.IsDownVote = false;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                if (haveLiked.IsDownVote == false)
                {
                    blog.DownVoteCount++;
                    blog.Score = blog.Score - 1;
                    haveLiked.IsDownVote = true;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            blog.DownVoteCount++;
            blog.Score = blog.Score - 1;

            var BlogReaction = new BlogReaction()
            {
                UserId = int.Parse(userId),
                BlogId = id,
                IsUpVote = false,
                IsDownVote = true
            };
            _context.BlogReactions.Add(BlogReaction);
            await _context.SaveChangesAsync();
            return Ok();


        }

        [Authorize]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditBlogs(int id, BlogDto blogDto)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            if (blog.UserId == int.Parse(userId))
            {
                return Unauthorized();
            }

            blog.Title = blogDto.Title;
            blog.Content = blogDto.Content;
            blog.Category = blogDto.Category;
            blog.IsEdited = true;
            blog.UpdatedAt = DateTime.Now;

            var BlogHistory = new BlogHistory()
            {
                Title = blogDto.Title,
                Content = blogDto.Content,
                Category = blogDto.Category,
                BlogId = id,
                UpdatedAt = DateTime.Now
            };
            _context.BlogHistories.Add(BlogHistory);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBlogs(int id)
        {
            var blog = _context.Blogs.Where(u => u.Id == id).ToList();
            var blogReaction = _context.BlogReactions.Where(u => u.BlogId == id).ToList();
            var blogHistory = _context.BlogHistories.Where(u => u.BlogId == id).ToList();
            if (blogHistory.Count > 0)
            {
                _context.BlogHistories.RemoveRange(blogHistory);
            }
            if (blogReaction.Count > 0)
            {
                _context.BlogReactions.RemoveRange(blogReaction);
            }

            _context.Blogs.RemoveRange(blog);

            await _context.SaveChangesAsync();
            return Ok();


        }

        [HttpPost]
        [Route("UploadBlog")]
        public async Task<IActionResult> BlogUpload([FromForm] BlogDto model)
        {
            if (model?.BlogImage == null || model.BlogImage.Length <= 0)
            {
                return BadRequest("No file was uploaded.");
            }

            if (string.IsNullOrEmpty(model.Title) || string.IsNullOrEmpty(model.Content) || string.IsNullOrEmpty(model.Category))
            {
                return BadRequest("Title, content, or category is missing.");
            }

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(model.BlogImage.FileName);
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.BlogImage.CopyToAsync(fileStream);
            }
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;

            var blog = new Blog()
            {
                Title = model.Title,
                Content = model.Content,
                Category = model.Category,
                ImagePath = filePath,
                Score = 0,
                UserId = int.Parse(userId),
                IsEdited = false,
                UpdatedAt = null,
                UpVoteCount = 0,
                DownVoteCount = 0,
                CreatedAt = DateTime.Now
            };
            


            _context.Blogs.Add(blog);
            
            await _context.SaveChangesAsync();

            return Ok("File uploaded successfully.");
        }
    }
}
