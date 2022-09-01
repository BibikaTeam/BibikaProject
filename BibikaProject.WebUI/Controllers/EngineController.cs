using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.Requests;
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
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> AddEngine([FromBody] AddEngineDTO model)
        {
            await engineService.AddEngineAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> UpdateEngine([FromBody] UpdateEngineDTO model)
        {
            await engineService.UpdateEngineAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> DeleteEngine(int id)
        {
            await engineService.DeleteEngineAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetEngines([FromQuery] PagedEngineRequest request)
        {
            var result = await engineService.GetPagedEnginesAsync(request);

            return Ok(result);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllEngines()
        {
            var result = await engineService.GetAllEnginesAsync();

            return Ok(result);
        }

        [HttpGet("get/by-generation/{id}")]
        public async Task<IActionResult> GetEnginesByGeneration(int id)
        {
            var result = await engineService.GetAllEnginesByGenerationAsync(id);

            return Ok(result);
        }
    }
}
