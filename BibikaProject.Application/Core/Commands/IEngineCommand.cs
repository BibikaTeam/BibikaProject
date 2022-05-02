using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IEngineCommand
    {
        Task AddEngineAsync(Engine engine);

        void UpdateEngine(Engine engine);

        void DeleteEngine(int id);

        Task SaveChangesAsync();
    }
}
