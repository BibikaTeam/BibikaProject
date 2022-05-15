using BibikaProject.Application.Core.DTO.CompleteSet;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface ICompleteSetService
    {
        Task AddCompleteSetAsync(AddCompleteSetDTO addCompleteSetDTO);

        Task UpdateCompleteSetAsync(UpdateCompleteSetDTO updateCompleteSetDTO);

        Task DeleteCompleteSetAsync(int id);

        Task<List<CompleteSetDTO>> GetAllCompleteSets();
    }
}
