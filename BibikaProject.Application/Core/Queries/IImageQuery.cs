using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IImageQuery
    {
        Task<IQueryable<Image>> GetAllImagesAsync();

        Task<Image> GetImageIdAsync(int id);
    }
}
