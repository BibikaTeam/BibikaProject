using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IBrandCommand
    {
        Task AddBrandAsync(Brand brand);

        void UpdateBrand(Brand brand);

        void DeleteBrand(int id);

        Task SaveChangesAsync();
    }
}
