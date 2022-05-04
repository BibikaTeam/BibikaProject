using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class GearBoxCommand : BaseCommand<GearBox, int>, IGearBoxCommand
    {
        public GearBoxCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
