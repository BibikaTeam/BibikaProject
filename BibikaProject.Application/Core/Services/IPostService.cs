using BibikaProject.Application.Core.DTO.Post;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IPostService
    {
        Task AddPostAsync(AddPostDTO addPostDTO);
    }
}
