using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IModelCommand
    {
        Task AddModelAsync(Model model);

        void UpdateModel(Model model);

        void DeleteModel(int id);

        Task SaveChangesAsync();
    }
}
