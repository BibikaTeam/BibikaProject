using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class EngineCommand : IEngineCommand
    {
        public EngineCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddEngineAsync(Engine engine)
        {
            await context.Engines.AddAsync(engine);
        }

        public void DeleteEngine(int id)
        {
            context.Engines.Remove(context.Engines.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateEngine(Engine engine)
        {
            context.Engines.Update(engine);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
