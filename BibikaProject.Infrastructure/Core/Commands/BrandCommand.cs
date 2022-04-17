using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class BrandCommand : IBrandCommand
    {      
        public BrandCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddBrandAsync(Brand brand)
        {
            await context.Brands.AddAsync(brand);
        }

        public void DeleteBrand(int id)
        {
            context.Brands.Remove(context.Brands.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateBrand(Brand brand)
        {
            context.Brands.Update(brand);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
