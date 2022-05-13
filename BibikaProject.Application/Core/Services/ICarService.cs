using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface ICarService
    {
        Task AddCarAsync(AddCarDTO addCarDTO);

        Task UpdateCarAsync(UpdateCarDTO updateCarDTO);

        Task DeleteCarAsync(int id);

        Task<PagedList<CarDTO>> GetPagedCarsAsync(PagedCarsRequest pagedCarRequest);

        Task<CarDTO> GetCarByParamsAsync(GetCarDTO getCarDTO);
    }
}
