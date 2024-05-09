using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BlogId {  get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        [ForeignKey(nameof(BlogId))]
        public virtual Blog Blog { get; set; }
        public string Text {  get; set; }
        public DateTime CreatedAt {  get; set; }  
        public DateTime? UpdatedAt { get; set;}
        public bool IsEdited { get; set; }
        public int Score {  get; set; }
        public int UpVoteCount {  get; set; }
        public int DownVoteCount { get; set;}



    }
}
