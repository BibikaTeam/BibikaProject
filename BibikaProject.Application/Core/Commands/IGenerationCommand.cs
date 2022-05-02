using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IGenerationCommand
    {
        Task AddGenerationAsync(Generation generation);

        void UpdateGeneration(Generation generation);

        void DeleteGeneration(int id);

        Task SaveChangesAsync();
    }
}
