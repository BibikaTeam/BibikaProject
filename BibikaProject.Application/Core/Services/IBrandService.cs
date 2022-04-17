using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.Requests;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IBrandService
    {
        Task AddBrand(AddBrandDTO addBrandDTO);

        void UpdateBrand(UpdateBrandDTO updateBrandDTO);

        void DeleteBrand(int id);

        void GetPagedBrands(PagedBrandsRequest pagedBrandsRequest);
    }
}
