using ABS3.Model;
using ABS3.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ABS3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly AppDbContext _context;
        public LoginController(IConfiguration config, AppDbContext context)
        {

            _config = config;
            _context = context;
        }

        //return the object of the user that is logged in
        private User AuthenticateLogin(LoginDto request)
        {
            var password = Hash.HashPassword(request.Password);
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email && u.Password == password);
            return user;
        }


        //a method to generate the token for the user
        private string GenerateToken(User user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey,SecurityAlgorithms.HmacSha256);


            var claims = new[]
                {
               new Claim("UserId", user.Id.ToString()),
               new Claim("UserName", user.Name),
               new Claim("Email", user.Email),
               new Claim("Role", user.role),
                };


            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, 
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                
                );
            return new JwtSecurityTokenHandler().WriteToken(token);


        }
        //method to create a login token using a api end point
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(LoginDto login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateLogin(login);
            if (user != null)
            {
                var token = GenerateToken(user);
                response = Ok(new {token= token, role = user.role, id=user.Id});
            }
            return response;
        }


    }
}
