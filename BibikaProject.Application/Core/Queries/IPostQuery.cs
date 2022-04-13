using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IPostQuery
    {
        Task<IQueryable<Option>> GetAllPostsAsync();

        Task<Option> GetPostIdAsync(int id);
    }
}
