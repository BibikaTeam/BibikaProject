using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class OptionCommand : IOptionCommand
    {
        public OptionCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddOptionAsync(Option option)
        {
            await context.Options.AddAsync(option);
        }

        public void DeleteOption(int id)
        {
            context.Options.Remove(context.Options.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateOption(Option option)
        {
            context.Options.Update(option);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
