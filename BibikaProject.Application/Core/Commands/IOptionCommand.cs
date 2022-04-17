using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IOptionCommand
    {
        Task AddOptionAsync(Option option);

        void UpdateOption(Option option);

        void DeleteOption(int id);

        Task SaveChangesAsync();
    }
}
