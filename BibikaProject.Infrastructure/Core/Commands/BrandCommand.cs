using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class BrandCommand : BaseCommand<Brand, int>, IBrandCommand
    {      
        public BrandCommand(ApplicationDbContext context) : base(context)
        {          
        }
    }
}
