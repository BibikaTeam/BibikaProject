using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class GenerationCommand : BaseCommand<Generation, int>, IGenerationCommand
    {
        public GenerationCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
