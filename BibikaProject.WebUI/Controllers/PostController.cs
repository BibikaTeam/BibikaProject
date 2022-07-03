using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Requests;
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

        [HttpPost("add-images")]
        public async Task<IActionResult> AddImagesToPost(AddImagesToPostDTO addImagesToPostDTO)
        {
            await postService.AddImagesToPost(addImagesToPostDTO);

            return Ok();
        }

        [HttpPost("add-options")]
        public async Task<IActionResult> AddOptionsToPost(AddOptionsToPostDTO addOptionsToPostDTO)
        {
            await postService.AddOptionsToPost(addOptionsToPostDTO);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await postService.GetAllPosts();

            return Ok(result);
        }

        [HttpPost("get")]
        public async Task<IActionResult> GetPagedPosts([FromBody] PagedPostRequest pagedPostRequest)
        {
            var result = await postService.GetPagedPosts(pagedPostRequest);

            return Ok(result);
        }
    }
}
