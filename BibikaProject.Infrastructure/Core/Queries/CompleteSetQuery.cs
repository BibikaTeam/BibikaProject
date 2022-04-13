using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CompleteSetQuery : ICompleteSetQuery
    {
        public CompleteSetQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<CompleteSet> GetAllCompleteSetsAsync()
        {
            return context.CompleteSets.AsQueryable();
        }

        public async Task<CompleteSet> GetCompleteSetByIdAsync(int id)
        {
            return await context.CompleteSets.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
