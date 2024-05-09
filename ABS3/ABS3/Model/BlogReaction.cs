using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class BlogReaction
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User user { get; set; }
        public int BlogId { get; set; }
        [ForeignKey(nameof(BlogId))]
        public virtual Blog blogs { get; set; }

        public bool? IsUpVote { get; set; }
        public bool? IsDownVote { get; set; }

        public DateTime CreatedAt { get; set; }



    }
}
