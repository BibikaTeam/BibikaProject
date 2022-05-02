using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CarQuery : ICarQuery
    {
        public CarQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Car> GetAllCarsAsync()
        {
            return context.Cars.AsQueryable();
        }

        public async Task<Car> GetCarByIdAsync(int id)
        {
            return await context.Cars.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
