using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/car/")]
    [ApiController]
    public class CarController  : ControllerBase
    {
        public CarController(ICarService carService)
        {
            this.carService = carService;
        }

        private readonly ICarService carService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddCar([FromBody] AddCarDTO model)
        {
            await carService.AddCarAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateCar([FromBody] UpdateCarDTO model)
        {
            await carService.UpdateCarAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            await carService.DeleteCarAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetCars([FromQuery] PagedCarsRequest request)
        {
            var result = await carService.GetPagedCarsAsync(request);

            return Ok(result);
        }

        [HttpGet("get/by-params")]
        public async Task<IActionResult> GetCarByParams([FromQuery] GetCarDTO model)
        {
            var result = await carService.GetCarByParamsAsync(model);

            return Ok(result);
        }
    }
}
