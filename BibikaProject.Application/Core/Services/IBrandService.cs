using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IBrandService
    {
        Task AddBrandAsync(AddBrandDTO addBrandDTO);

        Task UpdateBrandAsync(UpdateBrandDTO updateBrandDTO);

        Task DeleteBrandAsync(int id);

        Task<PagedList<BrandDTO>> GetPagedBrandsAsync(PagedBrandsRequest pagedBrandsRequest);
    }
}
