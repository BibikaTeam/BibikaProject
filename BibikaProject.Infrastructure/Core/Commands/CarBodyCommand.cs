using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CarBodyCommand : BaseCommand<CarBody, int>, ICarBodyCommand
    {
        public CarBodyCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
