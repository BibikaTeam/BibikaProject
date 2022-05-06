using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IGenerationService
    {
        Task AddGenerationAsync(AddGenerationDTO addGenerationDTO);

        Task UpdateGenerationAsync(UpdateGenerationDTO updateGenerationDTO);

        Task DeleteGenerationAsync(int id);

        Task<PagedList<GenerationDTO>> GetPagedGenerationsAsync(PagedGenerationsRequest pagedGenerationsRequest);

        Task<List<GenerationDTO>> GetAllGenerationsAsync();

        Task<List<GenerationDTO>> GetGenerationsByModelAsync(int modelId);
    }
}
