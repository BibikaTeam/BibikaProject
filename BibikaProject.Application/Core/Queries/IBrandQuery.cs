using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IBrandQuery
    {
        Task<IQueryable<Brand>> GetAllBrandsAsync();

        Task<Brand> GetBrandByIdAsync(int id);
    }
}
