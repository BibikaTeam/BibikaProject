using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    public class Base64
    {
        public string Value { get; set; }
    }

    [Route("api/image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        public ImageController(IImageService imageService)
        {
            this.imageService = imageService;
        }

        private readonly IImageService imageService;

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddImage([FromBody] string base64)
        {
            await imageService.SaveImage(base64, HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value);

            return Ok(); 
        }
    }
}
