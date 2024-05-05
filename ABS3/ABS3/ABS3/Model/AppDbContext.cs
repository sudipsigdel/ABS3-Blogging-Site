using Microsoft.EntityFrameworkCore;

namespace ABS3.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentReaction> Reactions { get; set; }

        public DbSet<CommentHistory> Histories { get; set; }
        public DbSet<BlogReaction> BlogReactions { get; set; }
        public DbSet<BlogHistory> BlogHistories { get; set; }

        public DbSet<Code> Codes { get; set; }

        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
