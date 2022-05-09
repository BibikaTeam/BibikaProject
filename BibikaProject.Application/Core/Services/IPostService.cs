using BibikaProject.Application.Core.DTO.Post;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IPostService
    {
        Task AddPostAsync(AddPostDTO addPostDTO);

        // temporary method returning all posts for test
        Task<List<PostDTO>> GetAllPosts();
    }
}
