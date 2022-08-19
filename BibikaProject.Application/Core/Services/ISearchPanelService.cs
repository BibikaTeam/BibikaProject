using BibikaProject.Application.Core.DTO.SearchPanel;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface ISearchPanelService
    {
        Task<SearchPanelOutputDTO> GetMissingData(SearchPanelInputDTO data);
    }
}
