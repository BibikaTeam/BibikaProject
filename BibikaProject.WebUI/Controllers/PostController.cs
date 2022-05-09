using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewPost(AddPostDTO postDTO)
        {
            await postService.AddPostAsync(postDTO);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await postService.GetAllPosts();

            return Ok(result);
        }
    }
}
