﻿using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IModelService
    {
        Task AddModelAsync(AddModelDTO addModelDTO);

        Task UpdateModelAsync(UpdateModelDTO updateModelDTO);

        Task DeleteModelAsync(int id);

        Task<PagedList<ModelDTO>> GetPagedModelsAsync(PagedModelsRequest pagedModelsRequest);
    }
}
