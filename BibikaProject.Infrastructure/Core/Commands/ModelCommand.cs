using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Errors;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class ModelCommand : BaseCommand<Model, int>, IModelCommand
    {
        public ModelCommand(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<Model> AddAsync(Model entity)
        {
            if (await context.Brands.FindAsync(entity.BrandId) == null)
            {
                throw new BadRequestException("There is no brand with this Id.");
            }

            return await base.AddAsync(entity);
        }
    }
}
