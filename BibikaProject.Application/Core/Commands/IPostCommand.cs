using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IPostCommand
    {
        Task AddPostAsync(Post post);

        void UpdatePost(Post post);

        void DeletePost(int id);

        Task SaveChangesAsync();
    }
}
