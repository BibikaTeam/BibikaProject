using BibikaProject.Domain.Entities.Core;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IImageCommand
    {
        Task AddImageAsync(Image image);

        void UpdateImage(Image image);

        void DeleteImage(int id);

        Task SaveChangesAsync();
    }
}
