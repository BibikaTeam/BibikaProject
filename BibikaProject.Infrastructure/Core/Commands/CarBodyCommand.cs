using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CarBodyCommand : ICarBodyCommand
    {
        public CarBodyCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddCarBodyAsync(CarBody carBody)
        {
           await context.CarBodies.AddAsync(carBody);
        }

        public void DeleteCarBody(int id)
        {
            context.CarBodies.Remove(context.CarBodies.FirstOrDefault(x => x.Id == id));
        }
        
        public void UpdateCarBody(CarBody carBody)
        {
            context.CarBodies.Update(carBody);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
