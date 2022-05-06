using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class GenerationService : IGenerationService
    {
        public GenerationService(IMapper mapper, IGenerationQuery query, IGenerationCommand command)
        {
            this.mapper = mapper;
            this.query = query;
            this.command = command;
        }

        private readonly IGenerationCommand command;
        private readonly IGenerationQuery query;
        private readonly IMapper mapper;

        public async Task AddGenerationAsync(AddGenerationDTO addGenerationDTO)
        {
            await command.AddAsync(mapper.Map<Generation>(addGenerationDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteGenerationAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<GenerationDTO>> GetPagedGenerationsAsync(PagedGenerationsRequest pagedGenerationsRequest)
        {
            IQueryable<Generation> generations = query.GetAll()
                                                      .Include(x => x.Model)
                                                      .ThenInclude(x => x.Brand);

            var response = new PagedList<GenerationDTO> { CurrentPage = pagedGenerationsRequest.Page };

            if (!string.IsNullOrEmpty(pagedGenerationsRequest.Search))
            {
                generations = generations.Where(x => x.Title.Contains(pagedGenerationsRequest.Search));
            }

            if (pagedGenerationsRequest.ModelId != 0)
            {
                generations = generations.Where(x => x.ModelId == pagedGenerationsRequest.BrandId);
            }

            if (pagedGenerationsRequest.BrandId != 0)
            {
                generations = generations.Where(x => x.Model.BrandId == pagedGenerationsRequest.BrandId);
            }

            response.AllPages = (int)Math.Ceiling((double)await generations.CountAsync() / (double)pagedGenerationsRequest.CountOnPage);

            generations = generations.Skip((pagedGenerationsRequest.Page - 1) * pagedGenerationsRequest.CountOnPage)
                                     .Take(pagedGenerationsRequest.CountOnPage)
                                     .AsNoTracking();

            response.Data = await generations.Select(x => mapper.Map<GenerationDTO>(x)).ToListAsync();

            return response;
        }

        public async Task UpdateGenerationAsync(UpdateGenerationDTO updateGenerationDTO)
        {
            command.Update(mapper.Map<Generation>(updateGenerationDTO));

            await command.SaveChangesAsync();
        }

        public async Task<List<GenerationDTO>> GetAllGenerationsAsync()
        {
            return await query.GetAll()
                              .Include(x => x.Model)
                              .ThenInclude(x => x.Brand)
                              .Select(x => mapper.Map<GenerationDTO>(x))
                              .ToListAsync();
        }

        public async Task<List<GenerationDTO>> GetGenerationsByModelAsync(int modelId)
        {
            return await query.GetAll()
                              .Include(x => x.Model)
                              .ThenInclude(x => x.Brand)
                              .Where(x => x.ModelId == modelId)
                              .Select(x => mapper.Map<GenerationDTO>(x))
                              .ToListAsync();
        }
    }
}
