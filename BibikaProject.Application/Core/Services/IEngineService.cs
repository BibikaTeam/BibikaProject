using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IEngineService
    {
        Task AddEngineAsync(AddEngineDTO addEngineDTO);

        Task UpdateEngineAsync(UpdateEngineDTO updateEngineDTO);

        Task DeleteEngineAsync(int id);   
        
        Task<List<EngineDTO>> GetAllEnginesAsync();

        Task<List<EngineDTO>> GetAllEnginesByGenerationAsync(int generationId);

        Task<PagedList<EngineDTO>> GetPagedEnginesAsync(PagedEngineRequest pagedEngineRequest);
    }
}
