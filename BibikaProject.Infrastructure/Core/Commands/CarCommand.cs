using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CarCommand : ICarCommand
    {
        public CarCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddCarAsync(Car car)
        {
            await context.Cars.AddAsync(car);
        }

        public void DeleteCar(int id)
        {
            context.Cars.Remove(context.Cars.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateCar(Car car)
        {
            context.Cars.Update(car);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
