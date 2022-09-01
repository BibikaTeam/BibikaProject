using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/generation/")]
    [ApiController]
    public class GenerationController : ControllerBase
    {
        public GenerationController(IGenerationService generationService)
        {
            this.generationService = generationService;
        }

        private readonly IGenerationService generationService;

        [HttpPost("add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddGeneration([FromBody] AddGenerationDTO model)
        {
            await generationService.AddGenerationAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> UpdateGeneration([FromBody] UpdateGenerationDTO model)
        {
            await generationService.UpdateGenerationAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = ENV.AdminRoleName)]
        public async Task<IActionResult> DeleteGeneration(int id)
        {
            await generationService.DeleteGenerationAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetGenerations([FromQuery] PagedGenerationsRequest request)
        {
            var result = await generationService.GetPagedGenerationsAsync(request);

            return Ok(result);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllGenrations()
        {
            var result = await generationService.GetAllGenerationsAsync();

            return Ok(result);
        }

        [HttpGet("get/by-model/{id}")]
        public async Task<IActionResult> GetGenerationsByBrand(int id)
        {
            var result = await generationService.GetGenerationsByModelAsync(id);

            return Ok(result);
        }
    }
}
