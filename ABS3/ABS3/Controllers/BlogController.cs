using ABS3.DTO;
using ABS3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http.Controllers;

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
        //This method is used to get all the blogs
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
        //this method is used to get the blogs details using id
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogsId(int id)
        {
            var blogs = await _context.Blogs.
                Where(c=> c.Id == id)
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
        //method is used to upvote the blog
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
                    return BadRequest();
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
                IsDownVote = false,
                CreatedAt = DateTime.Now
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
        //this method is used to downvote blog
        [Authorize]
        [HttpPut("downvote/{id}")]
        public async Task<IActionResult> DownVoteBlog(int id)
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
                if (haveLiked.IsUpVote == true)
                {
                    return BadRequest();
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
                IsDownVote = true,
                CreatedAt = DateTime.Now,
            };

            var notification = new Notification()
            {
                UserId = blog.UserId,
                NotificationMsg = userName + " has Disliked on your blog.",
                CreatedOn = DateTime.Now,
                IsViewed = false
            };
            _context.Notifications.Add(notification);


            _context.BlogReactions.Add(BlogReaction);
            await _context.SaveChangesAsync();
            return Ok();


        }
        //this method is used to edit the blogs
        [Authorize]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditBlogs(int id, [FromForm] BlogDto blogDto)
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value;
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            if (blog.UserId != int.Parse(userId))
            {
                return Unauthorized();
            }
            if (blogDto.BlogImage.Length > 3 * 1024 * 1024)
            {
                return BadRequest("File size exceeds the limit of 3MB.");
            }
            var BlogHistory = new BlogHistory()
            {
                Title = blog.Title,
                Content = blog.Content,
                Category = blog.Category,
                BlogId = id,
                UpdatedAt = DateTime.Now
            };

            blog.Title = blogDto.Title;
            blog.Content = blogDto.Content;
            blog.Category = blogDto.Category;
            blog.IsEdited = true;
            blog.UpdatedAt = DateTime.Now;

            if (blogDto.BlogImage != null && blogDto.BlogImage.Length > 0)
            {
                string webrootpath = _environment.WebRootPath;
                string uploadsFolder = Path.Combine(webrootpath, "uploads/blogs");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(blogDto.BlogImage.FileName);

                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await blogDto.BlogImage.CopyToAsync(fileStream);
                }

                blog.ImagePath = filePath;
            }

            
            _context.BlogHistories.Add(BlogHistory);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //this method is used to delete the blogs
        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBlogs(int id)
        {
            var blog = _context.Blogs.Where(u => u.Id == id).ToList();
            var blogReaction = _context.BlogReactions.Where(u => u.BlogId == id).ToList();
            var blogHistory = _context.BlogHistories.Where(u => u.BlogId == id).ToList();
            var comment = _context.Comments.Where(u => u.BlogId == id).ToList();
            foreach (Comment c in comment)
            {
                var commentHistory = _context.Histories.Where(a=> a.CommentId == c.Id).ToList();
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

            _context.Blogs.RemoveRange(blog);

            await _context.SaveChangesAsync();
            return Ok();


        }
        //this method is used to upload the blog by the users
        [Authorize]
        [HttpPost]
        [Route("UploadBlog")]
        public async Task<IActionResult> BlogUpload([FromForm] BlogDto model)
        {
            if (model?.BlogImage == null || model.BlogImage.Length <= 0)
            {
                return BadRequest("No file was uploaded.");
            }
            //it is used to limit the file size of 3 mb
            if (model.BlogImage.Length > 3 * 1024 * 1024)
            {
                return BadRequest("File size exceeds the limit of 3MB.");
            }
            if (string.IsNullOrEmpty(model.Title) || string.IsNullOrEmpty(model.Content) || string.IsNullOrEmpty(model.Category))
            {
                return BadRequest("Title, content, or category is missing.");
            }
            //creating a path for uploading a file
            string webrootpath = _environment.WebRootPath;
            string uploadsFolder = Path.Combine(webrootpath, "uploads/blogs");
            //create a folder to sore the file
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            //creating a unique file name
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
        //this method is used to get the blogs of the user who are logged in
        [HttpGet]
        [Route("GetUserBlogs")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BlogDisplayDTO>>> GetUserBlogs()
        {
            var userIdClaim = User.Claims.FirstOrDefault(claim => claim.Type == "UserId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return BadRequest("User ID claim not found.");
            }

            if (!int.TryParse(userIdClaim.Value, out var userId))
            {
                return BadRequest("Invalid user ID format.");
            }

            var blogs = await _context.Blogs
                .Include(b => b.User)
                .Where(b => b.UserId == userId)
                .ToListAsync();

            var blogDtos = blogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name,
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });

            return Ok(blogDtos);
        }
        //this is used to filter the recency of the blogs
        [HttpGet]
        [Route("BlogsRecency")]
        public async Task<ActionResult<IEnumerable<Blog>>> BlogsRecency()
        {
            var recentBlogs = await _context.Blogs
                .Include(b => b.User)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            if (recentBlogs == null || recentBlogs.Count == 0)
            {
                return NotFound();
            }
            var blogDtos = recentBlogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name,
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });
            return Ok(blogDtos);
        }
        //thos is used to filter the popular blogs
        [HttpGet]
        [Route("BlogsPopular")]
        public async Task<ActionResult<IEnumerable<Blog>>> PopularBlogs()
        {
            var popularBlogs = await _context.Blogs
                .Include(b => b.User)
                .OrderByDescending(b => b.Score)
                .Take(10)
                .ToListAsync();

            var blogDtos = popularBlogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name,
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });
            return Ok(blogDtos);
        }
        //this is used to filter the oldest blogs
        [HttpGet]
        [Route("OldestBlogs")]
        public async Task<ActionResult<IEnumerable<Blog>>> OldestBlogs()
        {
            var oldestBlogs = await _context.Blogs
                .Include(b => b.User)
                .OrderBy(b => b.CreatedAt)
                .ToListAsync();

            var blogDtos = oldestBlogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name,
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });

            return Ok(blogDtos);
        }
        //this is used to get the randon blogs
        [HttpGet]
        [Route("RandomBlogs")]
        public async Task<ActionResult<IEnumerable<Blog>>> RandomBlogs()
        {
            var allBlogs = await _context.Blogs.Include(b => b.User).ToListAsync();
            var random = new Random();
            var shuffledBlogs = allBlogs.OrderBy(b => random.Next()).ToList();
            var blogDtos = shuffledBlogs.Select(blog => new BlogDisplayDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Score = blog.Score,
                ImagePath = blog.ImagePath,
                UserId = blog.UserId,
                UserName = blog.User.Name,
                Category = blog.Category,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                IsEdited = blog.IsEdited,
                UpVoteCount = blog.UpVoteCount,
                DownVoteCount = blog.DownVoteCount
            });


            return Ok(blogDtos);

        }
        [HttpGet("blogedithistory")]
        public async Task<ActionResult<IEnumerable<BlogHistory>>> editHistory(int id)
        {
            var blogHistory = await _context.BlogHistories.Where(u => u.BlogId== id).ToListAsync();
            return blogHistory;

        }


    }
}
