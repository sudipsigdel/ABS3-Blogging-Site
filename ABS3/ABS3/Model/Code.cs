using System.ComponentModel.DataAnnotations.Schema;

namespace ABS3.Model
{
    public class Code
    {
        public int id { get; set; }
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public int OTP { get; set; }
        public DateTime Expiry {  get; set; }

    }
}
