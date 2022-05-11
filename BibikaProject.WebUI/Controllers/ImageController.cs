﻿using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
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

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage(int id)
        {
            await imageService.DeleteImage(id, HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value);

            return Ok();
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var result = await imageService.GetImage(id);

            return File(result, "image/png");
        }
    }
}