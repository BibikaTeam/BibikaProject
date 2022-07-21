using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        private readonly IPostService postService;

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

        [HttpGet("get/user-posts/{email}")]
        public async Task<IActionResult> GetUserPosts(string email)
        {
            var result = await postService.GetUserPosts(email);

            return Ok(result);
        }

        [HttpGet("get/user-posts/{email}")]
        [Authorize]
        public async Task<IActionResult> GetUserPosts()
        {
            var result = await postService.GetUserPosts(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Email).Value);

            return Ok(result);
        }

        [HttpGet("get/user-liked/")]
        [Authorize]
        public async Task<IActionResult> GetUserLikedPosts()
        {
            var result = await postService.GetUserLikedPosts(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Email).Value);

            return Ok(result);
        }
    }
}
