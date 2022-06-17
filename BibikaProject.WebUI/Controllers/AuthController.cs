using BibikaProject.Application.Identity.Requests;
using BibikaProject.Application.Identity.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        public readonly IAuthService authService;

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginRequest model)
        {
            var result = await authService.LoginAsync(model);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest model)
        {
            await authService.RegisterAsync(model);

            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var result = await authService.RefreshAsync(request);

            return Ok(result);
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var result = await authService.GoogleLoginAsync(request);

            return Ok(result);
        }
    }
}
