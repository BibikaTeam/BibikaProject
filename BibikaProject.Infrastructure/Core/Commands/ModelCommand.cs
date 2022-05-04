using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class ModelCommand : BaseCommand<Model, int>, IModelCommand
    {
        public ModelCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
