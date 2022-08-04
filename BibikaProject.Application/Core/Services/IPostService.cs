using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IPostService
    {
        Task<int> AddPostAsync(AddPostDTO addPostDTO);

        // temporary method returning all posts for test
        Task<List<PostDTO>> GetAllPosts();

        Task<PagedList<PostDTO>> GetPagedPosts(PagedPostRequest pagedPostRequest);

        Task AddImagesToPost(AddImagesToPostDTO imagesToPostDTO);

        Task AddOptionsToPost(AddOptionsToPostDTO optionsToPostDTO);

        Task<List<PostDTO>> GetUserPosts(string id);

        Task<List<PostDTO>> GetUserLikedPosts(string id);
        
        Task<PostDTO> GetRandomPost();
    }
}
