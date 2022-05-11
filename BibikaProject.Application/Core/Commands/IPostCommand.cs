using BibikaProject.Domain.Entities.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IPostCommand : IBaseCommand<Post, int>
    {
        Task AddImagesToPost(int postId, List<int> imagesId);

        Task AddOptionsToPost(int postId, List<int> optionsId);
    }
}
