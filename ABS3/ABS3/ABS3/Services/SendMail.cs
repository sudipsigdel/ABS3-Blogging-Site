using ABS3.Model;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Net.Mail;
using System.Reflection;

namespace ABS3.Services
{
    public class SendMail
    {
        public bool Email(string email, int otp)
        {
            string sendMail = "anukulkarki11@gmail.com";
            string password = "tdsi vipn msau kqth";
            var data = otp.ToString();
            MailMessage message = new MailMessage();
            message.From = new MailAddress(sendMail);
            message.Subject = "Account Authenrication Email";
            message.To.Add(new MailAddress(email));
            message.Body = $"Your OTP is: {data}";

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
              Credentials = new NetworkCredential(sendMail, password),
              EnableSsl = true
            };
            smtp.Send(message);
            return true;

        }
    }
}
