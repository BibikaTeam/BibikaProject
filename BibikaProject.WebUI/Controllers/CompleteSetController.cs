using BibikaProject.Application.Core.DTO.CompleteSet;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/completeSet")]
    [ApiController]
    public class CompleteSetController : ControllerBase
    {
        public CompleteSetController(ICompleteSetService completeSetService)
        {
            this.completeSetService = completeSetService;
        }

        private readonly ICompleteSetService completeSetService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddCompleteSet([FromBody] AddCompleteSetDTO model)
        {
            await completeSetService.AddCompleteSetAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateCompleteSet([FromBody] UpdateCompleteSetDTO model)
        {
            await completeSetService.UpdateCompleteSetAsync(model); 

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCompleteSet(int id)
        {
            await completeSetService.DeleteCompleteSetAsync(id);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllCompleteSets()
        {
            var result = await completeSetService.GetAllCompleteSets();

            return Ok(result);
        }

        [HttpGet("get/by-brand/{id}")]
        public async Task<IActionResult> GetCompleteSetsByBrand(int id)
        {
            var result = await completeSetService.GetCompletSetsByGenerationAsync(id);

            return Ok(result);
        }

        [HttpGet("get/by-model/{id}")]
        public async Task<IActionResult> GetCompleteSetsByModel(int id)
        {
            var result = await completeSetService.GetCompletSetsByModelAsync(id);

            return Ok(result);
        }

        [HttpGet("get/by-generation/{id}")]
        public async Task<IActionResult> GetCompleteSetsByGeneration(int id)
        {
            var result = await completeSetService.GetCompletSetsByGenerationAsync(id);

            return Ok(result);
        }
    }
}
