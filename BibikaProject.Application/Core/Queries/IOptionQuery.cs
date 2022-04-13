using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IOptionQuery
    {
        Task<IQueryable<Option>> GetAllOptionsAsync();

        Task<Option> GetOptionIdAsync(int id);
    }
}
