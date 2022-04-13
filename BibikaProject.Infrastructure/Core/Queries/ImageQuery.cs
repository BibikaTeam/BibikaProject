using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class ImageQuery : IImageQuery
    {
        public ImageQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Image> GetAllImagesAsync()
        {
            return context.Images.AsQueryable();
        }

        public async Task<Image> GetImageIdAsync(int id)
        {
            return await context.Images.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
