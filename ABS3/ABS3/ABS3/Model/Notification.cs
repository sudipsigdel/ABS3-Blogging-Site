using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public string NotificationMsg { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsViewed {  get; set; }



    }
}
