using BibikaProject.Application.Core.DTO.Post;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IAdvertismentService
    {
        Task<PostDTO> GetRandomBannerPost();

        Task<PostDTO> GetRandomTrendPost();     

        Task EnableBannerAdvForPost(int postId, int addViews);

        Task DisableBannerAdvForPost(int postId);

        Task EnableTrendAdvForPost(int postId, int addViews);

        Task DisableTrendAdvForPost(int postId);

        Task AddMoneyToBalance(int postId, float amount);

        Task AddBannerViews(int postId, int amount);

        Task AddTrendViews(int postId, int amount);

        Task<float> GetBalance(int postId);

        Task<int> GetBannerViews(int postId);

        Task<int> GetTrendViews(int postId);

        Task<double> GetPoints(int postId);
    }
}
