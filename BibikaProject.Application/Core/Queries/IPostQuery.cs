using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IPostQuery
    {
        IQueryable<Post> GetAllPostsAsync();

        Task<Post> GetPostIdAsync(int id);
    }
}
