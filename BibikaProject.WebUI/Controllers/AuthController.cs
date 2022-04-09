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

            if (!string.IsNullOrEmpty(result.Error))
            {
                return Unauthorized(result.Error);
            }

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest model)
        {
            var result = await authService.RegisterAsync(model);

            if (result != null)
            {
                return BadRequest(result);
            }

            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var result = await authService.RefreshAsync(request);

            if (!string.IsNullOrEmpty(result.Error))
            {
                return BadRequest(result.Error);
            }

            return Ok(result);
        }
    }
}
