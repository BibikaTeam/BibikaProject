 using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class ImageCommand : IImageCommand
    {
        public ImageCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddImageAsync(Image image)
        {
            await context.Images.AddAsync(image);
        }

        public void DeleteImage(int id)
        {
            context.Images.Remove(context.Images.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateImage(Image image)
        {
            context.Images.Update(image);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
       
    }
}
