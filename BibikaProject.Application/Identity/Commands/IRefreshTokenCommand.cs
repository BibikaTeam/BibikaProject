using BibikaProject.Domain.Entities.Identity;
using System.Threading.Tasks;

namespace BibikaProject.Application.Identity.Commands
{
    public interface IRefreshTokenCommand
    {
        Task AddRefreshTokenAsync(RefreshToken token);

        void UpdateRefreshToken(RefreshToken token);

        Task SaveChangesAsync();
    }
}
