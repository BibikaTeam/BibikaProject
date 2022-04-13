using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IGenerationQuery
    {
        Task<IQueryable<Generation>> GetAllGenerationsAsync();

        Task<Generation> GetGenerationByIdAsync(int id);
    }
}
