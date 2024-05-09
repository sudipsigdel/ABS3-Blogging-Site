using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class CommentHistory
    {
        [Key]
        public int Id { get; set; }
        public int CommentId { get; set; }

        [ForeignKey(nameof(CommentId))]
        public Comment Comment { get; set; }
        public string Text { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
