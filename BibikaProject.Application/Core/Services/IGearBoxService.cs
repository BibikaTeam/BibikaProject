using BibikaProject.Application.Core.DTO.GearBox;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IGearBoxService
    {
        Task AddGearBoxAsync(AddGearBoxDTO addGearBoxDTO);

        Task UpdateGearBoxAsync(UpdateGearBoxDTO updateGearBoxDTO);

        Task DeleteGearBoxAsync(int id);

        Task<List<GearBoxDTO>> GetGearBoxesByGenerationId(int id);

        Task<List<GearBoxDTO>> GetAllGearBoxesAsync();
    }
}
