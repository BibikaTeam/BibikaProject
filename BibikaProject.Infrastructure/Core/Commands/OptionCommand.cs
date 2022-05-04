using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class OptionCommand : BaseCommand<Option, int>, IOptionCommand
    {
        public OptionCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
