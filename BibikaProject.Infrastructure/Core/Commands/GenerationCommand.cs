using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Errors;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class GenerationCommand : BaseCommand<Generation, int>, IGenerationCommand
    {
        public GenerationCommand(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<Generation> AddAsync(Generation entity)
        {
            if (await context.Models.FindAsync(entity.ModelId) == null)
            {
                throw new BadRequestException("There is no Model with this Id.");
            }

            return await base.AddAsync(entity);
        }
    }
}
