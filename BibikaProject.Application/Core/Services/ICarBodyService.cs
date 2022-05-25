using BibikaProject.Application.Core.DTO.CarBody;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface ICarBodyService
    {
        Task AddCarBodyAsync(AddCarBodyDTO addCarBodyDTO);

        Task UpdateCarBodyAsync(UpdateCarBodyDTO updateCarBodyDTO);

        Task DeleteCarBodyAsync(int id);

        Task<List<CarBodyDTO>> GetAllCarBodies();
    }
}
