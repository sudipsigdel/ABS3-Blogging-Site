using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class BlogHistory
    {
        public int Id { get; set; }
        public int BlogId { get; set; }

        [ForeignKey(nameof(BlogId))]
        public Blog blogs { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
