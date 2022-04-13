using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;
using System.Linq;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class ModelCommand : IModelCommand
    {
        public ModelCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddModelAsync(Model model)
        {
            await context.Models.AddAsync(model);
        }

        public void DeleteModel(int id)
        {
            context.Models.Remove(context.Models.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateModel(Model model)
        {
            context.Models.Update(model);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
