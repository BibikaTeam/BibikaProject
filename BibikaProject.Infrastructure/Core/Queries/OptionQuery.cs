using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class OptionQuery : IOptionQuery
    {
        public OptionQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Option> GetAllOptionsAsync()
        {
            return context.Options.AsQueryable();
        }

        public Task<Option> GetOptionIdAsync(int id)
        {
            return context.Options.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
