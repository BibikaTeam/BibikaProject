using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Errors;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CarCommand : BaseCommand<Car, int>, ICarCommand
    {
        public CarCommand(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<Car> AddAsync(Car entity)
        {
            if (await context.CarBodies.FindAsync(entity.CarBodyId) == null)
            {
                throw new BadRequestException("There is no CarBody with this Id.");
            }

            if (await context.Generations.FindAsync(entity.GenerationId) == null)
            {
                throw new BadRequestException("There is no Generation with this Id.");
            }

            if (await context.Engines.FindAsync(entity.EngineId) == null)
            {
                throw new BadRequestException("There is no Engine with this Id.");
            }

            if (await context.CompleteSets.FindAsync(entity.CompleteSetId) == null)
            {
                throw new BadRequestException("There is no CompleteSet with this Id.");
            }

            if (await context.GearBoxes.FindAsync(entity.GearBoxId) == null)
            {
                throw new BadRequestException("There is no GearBox with this Id.");
            }

            return await base.AddAsync(entity);
        }
    }
}
