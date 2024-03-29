﻿using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using BibikaProject.Infrastructure.Core.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/post/")]
    [ApiController]
    public class PostController : ControllerBase
    {
        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        private readonly IPostService postService;

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddNewPost(AddPostDTO postDTO)
        {
            var result = await postService.AddPostAsync(postDTO);

            return Ok(result);
        }

        [HttpPost("add-images")]
        [Authorize]
        public async Task<IActionResult> AddImagesToPost(AddImagesToPostDTO addImagesToPostDTO)
        {
            await postService.AddImagesToPost(addImagesToPostDTO);

            return Ok();
        }

        [HttpPost("add-options")]
        [Authorize]
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

        [HttpGet("get/user-posts/{userId}")]
        public async Task<IActionResult> GetUserPosts(string userId)
        {
            var result = await postService.GetUserPosts(userId);

            return Ok(result);
        }

        [HttpGet("get/user-posts/")]
        [Authorize]
        public async Task<IActionResult> GetUserPosts()
        {
            var result = await postService.GetUserPosts(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value);

            return Ok(result);
        }

        [HttpGet("get/user-liked/")]
        [Authorize]
        public async Task<IActionResult> GetUserLikedPosts()
        {
            var result = await postService.GetUserLikedPosts(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value);

            return Ok(result);
        }

        [HttpGet("get/random")]
        public async Task<IActionResult> GetRandomPost()
        {
            var result = await postService.GetRandomPost();

            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var result = await postService.GetPostById(id);

            return Ok(result);
        }

        [HttpGet("get/min-max-values/{generationId}")]
        public async Task<IActionResult> GetMinMaxValues(int generationId)
        {
            var result = await postService.GetMinMaxYearsPrice(generationId);

            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> DeletePost(int id)
        {
            await postService.DeletePost(id);

            return Ok();
        }

        [HttpGet("get/last-viewed")]
        [Authorize]
        public async Task<IActionResult> GetLastViwedPosts()
        {
            var result = await postService.GetLastViwedPosts(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value);

            return Ok(result);
        }
        [HttpGet("test")]
        public IActionResult Test()
        {
            string[] a = new string[] { "Test error", "test error2" };
            throw new BadRequestException(a);
        }

    }
}
