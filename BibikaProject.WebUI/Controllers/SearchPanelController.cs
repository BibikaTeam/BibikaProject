using BibikaProject.Application.Core.DTO.SearchPanel;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/search-panel/")]
    [ApiController]
    public class SearchPanelController : ControllerBase
    {
        public SearchPanelController(ISearchPanelService searchPanelService)
        {
            this.searchPanelService = searchPanelService;
        }

        private readonly ISearchPanelService searchPanelService;

        [HttpPost("get-missing-data")]
        public async Task<IActionResult> GetMissingData(SearchPanelInputDTO dto)
        {
            var result = await searchPanelService.GetMissingData(dto);

            return Ok(result);
        }
    }
}
