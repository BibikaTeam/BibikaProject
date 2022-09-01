using BibikaProject.Application.Core.DTO.GearBox;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/gearBox/")]
    [ApiController]
    public class GearBoxController : ControllerBase
    {
        public GearBoxController(IGearBoxService gearBoxService)
        {
            this.gearBoxService = gearBoxService;
        }

        private readonly IGearBoxService gearBoxService;

        [HttpPost("add")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> AddGearBox([FromBody] AddGearBoxDTO model)
        {
            await gearBoxService.AddGearBoxAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> UpdateGearBox([FromBody] UpdateGearBoxDTO model)
        {
            await gearBoxService.UpdateGearBoxAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> DeleteGearBox(int id)
        {
            await gearBoxService.DeleteGearBoxAsync(id);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllGearBoxes()
        {
            var result = await gearBoxService.GetAllGearBoxesAsync();

            return Ok(result);
        }

        [HttpGet("get/by-generation/{id}")]
        public async Task<IActionResult> GetGearBoxesByGenerationId(int id)
        {
            var result = await gearBoxService.GetGearBoxesByGenerationId(id);

            return Ok(result);
        }
    }
}
