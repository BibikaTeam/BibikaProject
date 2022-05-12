using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class BrandService : IBrandService
    {
        public BrandService(IBrandCommand command, IBrandQuery query, IMapper mapper)
        {
            this.command = command;
            this.query = query;
            this.mapper = mapper;
        }

        private readonly IBrandCommand command;
        private readonly IBrandQuery query;
        private readonly IMapper mapper;

        public async Task AddBrandAsync(AddBrandDTO addBrandDTO)
        {
            await command.AddAsync(mapper.Map<Brand>(addBrandDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteBrandAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<BrandDTO>> GetPagedBrandsAsync(PagedBrandsRequest pagedBrandsRequest)
        {
            var brands = query.GetAll();

            var response = new PagedList<BrandDTO> { CurrentPage = pagedBrandsRequest.Page };

            brands = brands.Search(pagedBrandsRequest.Search, "Title");

            response.AllPages = (int)Math.Ceiling((double)await brands.CountAsync() / (double)pagedBrandsRequest.CountOnPage);

            brands = brands.GetPage(pagedBrandsRequest.Page, pagedBrandsRequest.CountOnPage).AsNoTracking();

            response.Data = await brands.Select(x => mapper.Map<BrandDTO>(x)).ToListAsync();

            return response;
        }

        public async Task UpdateBrandAsync(UpdateBrandDTO updateBrandDTO)
        {
            command.Update(mapper.Map<Brand>(updateBrandDTO));

            await command.SaveChangesAsync();
        }

        public async Task<List<BrandDTO>> GetAllBrandsAsync()
        {
            return await query.GetAll().Select(x => mapper.Map<BrandDTO>(x)).ToListAsync();
        }
    }
}
