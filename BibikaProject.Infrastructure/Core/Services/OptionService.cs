using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Option;
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
    public class OptionService : IOptionService
    {
        public OptionService(IMapper mapper, IOptionCommand command, IOptionQuery query)
        {
            this.mapper = mapper;
            this.command = command;
            this.query = query;
        }

        private readonly IMapper mapper;
        private readonly IOptionCommand command;
        private readonly IOptionQuery query;

        public async Task AddOptionAsync(AddOptionDTO addOptionDTO)
        {
            await command.AddAsync(mapper.Map<Option>(addOptionDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteOptionAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<List<OptionDTO>> GetAllOptionsAsync()
        {
            return await query.GetAll().Select(x => mapper.Map<OptionDTO>(x)).ToListAsync();
        }

        public async Task<PagedList<OptionDTO>> GetPagedOptionsAsync(PagedOptionsRequest pagedOptionsRequest)
        {
            var brands = query.GetAll();

            var response = new PagedList<OptionDTO> { CurrentPage = pagedOptionsRequest.Page };

            if (!string.IsNullOrEmpty(pagedOptionsRequest.Search))
            {
                brands = brands.Where(x => x.Title.Contains(pagedOptionsRequest.Search) ||
                                           x.Category.Contains(pagedOptionsRequest.Search));
            }

            response.AllPages = (int)Math.Ceiling((double)await brands.CountAsync() / (double)pagedOptionsRequest.CountOnPage);

            brands = brands.Skip((pagedOptionsRequest.Page - 1) * pagedOptionsRequest.CountOnPage)
                           .Take(pagedOptionsRequest.CountOnPage)
                           .AsNoTracking();

            response.Data = await brands.Select(x => mapper.Map<OptionDTO>(x)).ToListAsync();

            return response;
        }

        public async Task UpdateOptionAsync(UpdateOptionDTO updateOptionDTO)
        {
            command.Update(mapper.Map<Option>(updateOptionDTO));

            await command.SaveChangesAsync();
        }
    }
}
