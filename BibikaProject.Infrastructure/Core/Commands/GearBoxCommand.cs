using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class GearBoxCommand : IGearBoxCommand
    {
        public GearBoxCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddGearBoxAsync(GearBox gearBox)
        {
            await context.GearBoxes.AddAsync(gearBox);
        }

        public void DeleteGearBox(int id)
        {
            context.GearBoxes.Remove(context.GearBoxes.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateGearBox(GearBox gearBox)
        {
            context.GearBoxes.Update(gearBox);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
