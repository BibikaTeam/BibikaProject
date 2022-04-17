using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class ModelQuery : IModelQuery
    {
        public ModelQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Model> GetAllModelsAsync()
        {
            return context.Models.AsQueryable();
        }

        public async Task<Model> GetModelIdAsync(int id)
        {
            return await context.Models.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
