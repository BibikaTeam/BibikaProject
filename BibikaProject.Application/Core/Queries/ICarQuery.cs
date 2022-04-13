using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface ICarQuery
    {
        Task<IQueryable<Car>> GetAllCarsAsync();

        Task<Car> GetCarByIdAsync(int id);
    }
}
