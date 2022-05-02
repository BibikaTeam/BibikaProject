using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface ICompleteSetCommand
    {
        Task AddCompleteSetAsync(CompleteSet completeSet);

        void UpdateCompleteSet(CompleteSet completeSet);

        void DeleteCompleteSet(int id);

        Task SaveChangesAsync();
    }
}
