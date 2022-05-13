using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/engine")]
    [ApiController]
    public class EngineController : ControllerBase
    {
        public EngineController(IEngineService engineService)
        {
            this.engineService = engineService;
        }

        private readonly IEngineService engineService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddEngine([FromBody] AddEngineDTO model)
        {
            await engineService.AddEngineAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateEngine([FromBody] UpdateEngineDTO model)
        {
            await engineService.UpdateEngineAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteEngine(int id)
        {
            await engineService.DeleteEngineAsync(id);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllGenrations()
        {
            var result = await engineService.GetAllEnginesAsync();

            return Ok(result);
        }

        [HttpGet("get/by-generation/{id}")]
        public async Task<IActionResult> GetGenerationsByBrand(int id)
        {
            var result = await engineService.GetAllEnginesByGenerationAsync(id);

            return Ok(result);
        }
    }
}
