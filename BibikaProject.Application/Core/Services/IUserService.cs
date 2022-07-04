using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IUserService
    {
        Task LikePost(string userId, int postId);
    }
}
