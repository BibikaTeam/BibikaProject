using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface ICarCommand
    {
        Task AddCarAsync(Car car);

        void UpdateCar(Car car);

        void DeleteCar(int id);

        Task SaveChangesAsync();
    }
}
