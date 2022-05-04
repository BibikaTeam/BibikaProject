using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class EngineCommand : BaseCommand<Engine, int>, IEngineCommand
    {
        public EngineCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
