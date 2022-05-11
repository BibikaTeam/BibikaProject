﻿using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/model/")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        public ModelController(IModelService modelService)
        {
            this.modelService = modelService;
        }

        private readonly IModelService modelService;

        [HttpPost("add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddModel([FromBody] AddModelDTO model)
        {
            await modelService.AddModelAsync(model);

            return Ok(); // must return created
        }

        [HttpPut("update")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateModel([FromBody] UpdateModelDTO model)
        {
            await modelService.UpdateModelAsync(model);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteModel(int id)
        {
            await modelService.DeleteModelAsync(id);

            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetModels([FromQuery] PagedModelsRequest request)
        {
            var result = await modelService.GetPagedModelsAsync(request);

            return Ok(result);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllModels()
        {
            var result = await modelService.GetAllModelsAsync();

            return Ok(result);
        }

        [HttpGet("get/by-brand/{id}")]
        public async Task<IActionResult> GetModelsByBrand(int id)
        {
            var result = await modelService.GetModelsByBrandAsync(id);

            return Ok(result);
        }
    }
}