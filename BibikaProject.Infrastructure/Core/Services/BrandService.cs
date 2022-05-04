using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Brand;
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
            var brands = query.GetAllBrandsAsync();

            var response = new PagedList<BrandDTO> { CurrentPage = pagedBrandsRequest.Page };

            if(!string.IsNullOrEmpty(pagedBrandsRequest.Search))
            {
                brands = brands.Where(x => x.Title.Contains(pagedBrandsRequest.Search));
            }

            response.AllPages = (int)Math.Ceiling((double)await brands.CountAsync() / (double)pagedBrandsRequest.CountOnPage);

            brands = brands.Skip((pagedBrandsRequest.Page - 1) * pagedBrandsRequest.CountOnPage)
                           .Take(pagedBrandsRequest.CountOnPage)
                           .AsNoTracking();

            foreach (var item in await brands.ToListAsync())
            {
                response.Data.Add(mapper.Map<BrandDTO>(item));
            }

            return response;
        }

        public async Task UpdateBrandAsync(UpdateBrandDTO updateBrandDTO)
        {
            command.Update(mapper.Map<Brand>(updateBrandDTO));

            await command.SaveChangesAsync();
        }
    }
}
