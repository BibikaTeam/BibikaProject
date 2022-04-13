using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class GenerationCommand : IGenerationCommand
    {
        public GenerationCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddGenerationAsync(Generation generation)
        {
            await context.Generations.AddAsync(generation);
        }

        public void DeleteGeneration(int id)
        {
            context.Generations.Remove(context.Generations.FirstOrDefault(x => x.Id == id));
        }
        
        public void UpdateGeneration(Generation generation)
        {
            context.Generations.Update(generation);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
