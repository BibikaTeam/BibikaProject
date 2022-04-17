using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface ICarBodyCommand
    {
        Task AddCarBodyAsync(CarBody carBody);

        void UpdateCarBody(CarBody carBody);

        void DeleteCarBody(int id);

        Task SaveChangesAsync();
    }
}
