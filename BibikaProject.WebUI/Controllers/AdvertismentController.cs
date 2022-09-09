using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/adv")]
    [ApiController]
    public class AdvertismentController : ControllerBase
    {
        public AdvertismentController(IAdvertismentService advertismentService)
        {
            this.advertismentService = advertismentService;
        }

        private readonly IAdvertismentService advertismentService;


        [HttpGet("get/random-banner")]
        public async Task<IActionResult> GetRandomBannerPost()
        {
            var result = await advertismentService.GetRandomBannerPost();

            return Ok(result);
        }

        [HttpGet("get/random-trend")]
        public async Task<IActionResult> GetRandomTrendPost()
        {
            var result = await advertismentService.GetRandomTrendPost();

            return Ok(result);
        }

        [HttpPut("enable-banner")]
        public async Task<IActionResult> EnableBannerAdvForPost([FromQuery] int postId, int addViews)
        {
            await advertismentService.EnableBannerAdvForPost(postId, addViews);

            return Ok();
        }

        [HttpPut("disable-banner")]
        public async Task<IActionResult> DisableBannerAdvForPost([FromQuery] int postId)
        {
            await advertismentService.DisableBannerAdvForPost(postId);

            return Ok();
        }

        [HttpPut("enable-trend")]
        public async Task<IActionResult> EnableTrendAdvForPost([FromQuery] int postId, int addViews)
        {
            await advertismentService.EnableTrendAdvForPost(postId, addViews);

            return Ok();
        }

        [HttpPut("disable-trend")]
        public async Task<IActionResult> DisableTrendAdvForPost(int postId)
        {
            await advertismentService.DisableTrendAdvForPost(postId);

            return Ok();
        }

        [HttpPut("add-money")]
        public async Task<IActionResult> AddMoneyToBalance([FromQuery] int postId, float amount)
        {
            await advertismentService.AddMoneyToBalance(postId, amount);

            return Ok();
        }

        [HttpPut("add-banner-views")]
        public async Task<IActionResult> AddBannerViews([FromQuery] int postId, int amount)
        {
            await advertismentService.AddBannerViews(postId, amount);

            return Ok();
        }

        [HttpPut("add-trend-views")]
        public async Task<IActionResult> AddTrendViews([FromQuery] int postId, int amount)
        {
            await advertismentService.AddTrendViews(postId, amount);

            return Ok();
        }

        [HttpGet("get-banner-views")]
        public async Task<IActionResult> GetBannerViews([FromQuery] int postId)
        {
            var result = await advertismentService.GetBannerViews(postId);

            return Ok(result);
        }

        [HttpGet("get-trend-views")]
        public async Task<IActionResult> GetTrendViews([FromQuery] int postId)
        {
            var result = await advertismentService.GetTrendViews(postId);

            return Ok(result);
        }

        [HttpGet("get-balance")]
        public async Task<IActionResult> GetBalance([FromQuery] int postId)
        {
            var result = await advertismentService.GetBalance(postId);

            return Ok(result);
        }

        [HttpGet("get-points")]
        public async Task<IActionResult> GetPoints([FromQuery] int postId)
        {
            var result = await advertismentService.GetPoints(postId);

            return Ok(result);
        }
    }
}
