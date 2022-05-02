using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpPost("posts/add")]
        public IActionResult AddNewPost(AddPostDTO postDTO)
        {
            postService.AddPostAsync(postDTO);

            return Ok();
        }
    }
}
