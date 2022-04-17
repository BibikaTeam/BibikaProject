using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IGearBoxCommand
    {
        Task AddGearBoxAsync(GearBox gearBox);

        void UpdateGearBox(GearBox gearBox);

        void DeleteGearBox(int id);

        Task SaveChangesAsync();
    }
}
