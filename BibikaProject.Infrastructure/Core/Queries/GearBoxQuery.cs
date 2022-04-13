using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class GearBoxQuery : IGearBoxQuery
    {
        public GearBoxQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<GearBox> GetAllGearBoxesAsync()
        {
            return context.GearBoxes.AsQueryable();
        }

        public async Task<GearBox> GetGearBoxByIdAsync(int id)
        {
            return await context.GearBoxes.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
