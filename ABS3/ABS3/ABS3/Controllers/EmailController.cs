using ABS3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ABS3.Services;
using Org.BouncyCastle.Asn1.Ocsp;

namespace ABS3.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

        private readonly AppDbContext _context;

        public EmailController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> sendEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email );

            if(user == null)
            {
                return NotFound();
            }
            
            Random random = new Random();
             var otp = random.Next(1000, 9999);

            Code code = new Code()
            {
                UserId = user.Id,
                OTP = otp,
                Expiry = DateTime.Now.AddMinutes(5)
            };

            _context.Codes.Add(code);
            await _context.SaveChangesAsync();


            SendMail mail = new SendMail();
            var result = mail.Email(user.Email, otp);
            return Ok();
        }
        [HttpPost("CodeValidate")]
        public async Task<ActionResult> CodeValidation(int code, string email)
        {
            
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if(user == null)
            {
                return NotFound("User Not Found");
            }
            var codeData = _context.Codes.FirstOrDefault(u => u.OTP == code && u.UserId == user.Id);

            if(codeData == null)
            {
                return NotFound("Code Not Found");
            }
            if(codeData.Expiry < DateTime.Now)
            {
                return Unauthorized("Code Expired");
            }
            return Ok();


        }
        [HttpGet("password")]
        public async Task<ActionResult> PasswordChange( string email, string password)
        {
            var passwordHash = Hash.HashPassword(password);
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if(user == null)
            {
                return NotFound();
            }
            user.Password = passwordHash;
            await _context.SaveChangesAsync();
            return Ok("Password Changed");
        }



    }
}
