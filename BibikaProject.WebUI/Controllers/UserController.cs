using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/user/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        private readonly IUserService userService;

        [HttpPost("like")]
        [Authorize]
        public async Task<IActionResult> LikePost(int postId)
        {
            await userService.LikePost(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value, postId);

            return Ok();
        }

        [HttpPost("view")]
        [Authorize]
        public async Task<IActionResult> ViewPost(int postId)
        {
            await userService.ViewPost(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value, postId);

            return Ok();
        }
    }
}
