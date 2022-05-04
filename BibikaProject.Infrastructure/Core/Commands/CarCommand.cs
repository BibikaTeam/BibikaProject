using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CarCommand : BaseCommand<Car, int>, ICarCommand
    {
        public CarCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
