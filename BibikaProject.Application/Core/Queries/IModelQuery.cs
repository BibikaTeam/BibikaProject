using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IModelQuery
    {
        Task<IQueryable<Model>> GetAllModelsAsync();

        Task<Model> GetModelIdAsync(int id);
    }
}
