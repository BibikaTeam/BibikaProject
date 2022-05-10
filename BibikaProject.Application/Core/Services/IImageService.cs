using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IImageService
    {
        Task SaveImage(string base64, string userId);

        Task DeleteImage(int id, string userId);

        Task<byte[]> GetImage(int id);
    }
}
