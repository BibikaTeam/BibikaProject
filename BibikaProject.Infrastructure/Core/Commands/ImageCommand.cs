using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class ImageCommand : BaseCommand<Image, int>, IImageCommand
    {
        public ImageCommand(ApplicationDbContext context) : base(context)
        {
        } 
    }
}
