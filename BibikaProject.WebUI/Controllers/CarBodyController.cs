using BibikaProject.Application.Core.DTO.CarBody;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/carBody")]
    [ApiController]
    public class CarBodyController : ControllerBase
    {
        public CarBodyController(ICarBodyService carBodyService)
        {
            this.carBodyService = carBodyService;
        }

        private readonly ICarBodyService carBodyService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddCarBody([FromBody] AddCarBodyDTO model)
        {
            await carBodyService.AddCarBodyAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateCarBody([FromBody] UpdateCarBodyDTO model)
        {
            await carBodyService.UpdateCarBodyAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCarBody(int id)
        {
            await carBodyService.DeleteCarBodyAsync(id);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllCarBody()
        {
            var result = await carBodyService.GetAllCarBodies();

            return Ok(result);
        }

        [HttpGet("get/by-generation/{id}")]
        public async Task<IActionResult> GetCarBodiesByGenerationId(int id)
        {
            var result = await carBodyService.GetCarBodiesByGenerationId(id);

            return Ok(result);
        }
    }
}
