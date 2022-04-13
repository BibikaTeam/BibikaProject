using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class EngineQuery : IEngineQuery
    {
        public EngineQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Engine> GetAllEnginesAsync()
        {
            return context.Engines.AsQueryable();
        }

        public async Task<Engine> GetEngineByIdAsync(int id)
        {
            return await context.Engines.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
