using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class CommentReaction
    {
        [Key]
        public int Id {  get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User user { get; set; }
        
        public int CommentId { get; set; }
        [ForeignKey(nameof(CommentId))]
        public virtual Comment comment { get; set; }

        public bool? IsUpVote { get; set; }
        public bool? IsDownVote { get; set; }
        public DateTime CreatedAt {  get; set; }

        

    }
}
