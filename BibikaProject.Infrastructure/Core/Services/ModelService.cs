using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class ModelService : IModelService
    {
        public ModelService(IModelCommand command, IModelQuery query, IMapper mapper)
        {
            this.command = command;
            this.query = query;
            this.mapper = mapper;
        }

        private readonly IModelCommand command;
        private readonly IModelQuery query;
        private readonly IMapper mapper;

        public async Task AddModelAsync(AddModelDTO addModelDTO)
        {
            await command.AddAsync(mapper.Map<Model>(addModelDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteModelAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<ModelDTO>> GetPagedModelsAsync(PagedModelsRequest pagedModelsRequest)
        {
            IQueryable<Model> models = query.GetAll()
                                            .Include(x => x.Brand);

            var response = new PagedList<ModelDTO> { CurrentPage = pagedModelsRequest.Page };

            if (!string.IsNullOrEmpty(pagedModelsRequest.Search))
            {
                models = models.Where(x => x.Title.Contains(pagedModelsRequest.Search));
            }

            if (pagedModelsRequest.BrandId != 0)
            {
                models = models.Where(x => x.BrandId == pagedModelsRequest.BrandId);
            }

            response.AllPages = (int)Math.Ceiling((double)await models.CountAsync() / (double)pagedModelsRequest.CountOnPage);

            models = models.Skip((pagedModelsRequest.Page - 1) * pagedModelsRequest.CountOnPage)
                           .Take(pagedModelsRequest.CountOnPage)
                           .AsNoTracking();

            foreach (var item in await models.ToListAsync())
            {
                response.Data.Add(mapper.Map<ModelDTO>(item));
            }

            return response;
        }

        public async Task UpdateModelAsync(UpdateModelDTO updateModelDTO)
        {
            command.Update(mapper.Map<Model>(updateModelDTO));

            await command.SaveChangesAsync();
        }
    }
}
