using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CarBodyQuery : ICarBodyQuery
    {
        public CarBodyQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<CarBody> GetAllCarBodiesAsync()
        {
            return context.CarBodies.AsQueryable();
        }

        public async Task<CarBody> GetCarBodyByIdAsync(int id)
        {
            return await context.CarBodies.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
