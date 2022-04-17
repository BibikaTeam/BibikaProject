using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class BrandQuery : IBrandQuery
    {
        public BrandQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Brand> GetAllBrandsAsync()
        {
            return context.Brands.AsQueryable();
        }

        public async Task<Brand> GetBrandByIdAsync(int id)
        {
            return await context.Brands.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
