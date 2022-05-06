using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/brand/")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        public BrandController(IBrandService brandService)
        {
            this.brandService = brandService;
        }

        public readonly IBrandService brandService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddBrand([FromBody] AddBrandDTO model)
        {
            await brandService.AddBrandAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateBrand([FromBody] UpdateBrandDTO model)
        {
            await brandService.UpdateBrandAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            await brandService.DeleteBrandAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetBrands([FromQuery] PagedBrandsRequest request)
        {
            var result = await brandService.GetPagedBrandsAsync(request);

            return Ok(result);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllBrands()
        {
            var result = await brandService.GetAllBrandsAsync();

            return Ok(result);
        }
    }
}
