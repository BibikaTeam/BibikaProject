using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class GenerationQuery : IGenerationQuery
    {
        public GenerationQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Generation> GetAllGenerationsAsync()
        {
            return context.Generations.AsQueryable();
        }

        public async Task<Generation> GetGenerationByIdAsync(int id)
        {
            return await context.Generations.FirstOrDefaultAsync(x => x.Id == id); 
        }
    }
}
