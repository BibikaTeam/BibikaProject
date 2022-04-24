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
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddGeneration([FromBody] AddGenerationDTO model)
        {
            await generationService.AddGenerationAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateGeneration([FromBody] UpdateGenerationDTO model)
        {
            await generationService.UpdateGenerationAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
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
    }
}
