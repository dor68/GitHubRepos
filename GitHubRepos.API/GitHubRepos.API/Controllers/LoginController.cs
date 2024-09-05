using GitHubRepos.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace GitHubRepos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        const string USER_NAME = "githubrepo";
        const string PASSWORD = "githubrepo@123";

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] User userLogin)
        {
            IActionResult response = Unauthorized();
            var userAuth = AuthenticateUser(userLogin);

            if (userAuth != null)
            {
                var tokenString = GenerateJWT(userAuth);
                response = Ok(new { token = tokenString });
            }

            return response;
        }


        private string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User AuthenticateUser(User userLogin)
        {
            User user = null;

            //Validate the User Credentials
            if (userLogin.Username.ToLower() == USER_NAME && userLogin.Password == PASSWORD)
            {
                user = new User
                {
                    Username = userLogin.Username
                };
            }
            return user;
        }



    }



}
