using BibikaProject.Domain.Entities.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IPostCommand : IBaseCommand<Post, int>
    {
        Task AddImagesToPost(int postId, List<int> imagesId);

        Task AddOptionsToPost(int postId, List<int> optionsId);

        Task LikePost(string userId, int postId);

        Task ViewPost(string userId, int postId);

        Task AddBannerViews(int postId, int amount);

        Task AddTrendViews(int postId, int amount);

        Task AddMoneyToBalance(int postId, float amount);

        Task EnableBannerAdvForPost(int postId, int addViews);

        Task DisableBannerAdvForPost(int postId);

        Task EnableTrendAdvForPost(int postId, int addViews);

        Task DisableTrendAdvForPost(int postId);

        Task DecrementBannerViews(int postId);

        Task DecrementTrendViews(int postId);
    }
}
