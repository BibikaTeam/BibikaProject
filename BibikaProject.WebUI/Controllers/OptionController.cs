using BibikaProject.Application.Core.DTO.Option;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/brand/")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        public OptionController(IOptionService optionService)
        {
            this.optionService = optionService;
        }

        public readonly IOptionService optionService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddOption([FromBody] AddOptionDTO model)
        {
            await optionService.AddOptionAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateOption([FromBody] UpdateOptionDTO model)
        {
            await optionService.UpdateOptionAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteOption(int id)
        {
            await optionService.DeleteOptionAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetOptions([FromQuery] PagedOptionsRequest request)
        {
            var result = await optionService.GetPagedOptionsAsync(request);

            return Ok(result);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllOptionsq()
        {
            var result = await optionService.GetAllOptionsAsync();

            return Ok(result);
        }
    }
}
