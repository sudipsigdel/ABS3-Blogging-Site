using ABS3.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.DTO
{
    public class BlogDisplayDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public int Score { get; set; }
        public string ImagePath { get; set; }
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsEdited { get; set; }
        public int UpVoteCount { get; set; }
        public int DownVoteCount { get; set; }
    }
}
