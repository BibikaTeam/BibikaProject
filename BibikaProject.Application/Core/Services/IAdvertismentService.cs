using BibikaProject.Application.Core.DTO.Post;
using System.Collections.Generic;
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
    }
}
