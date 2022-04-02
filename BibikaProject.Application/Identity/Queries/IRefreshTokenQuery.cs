using BibikaProject.Domain.Entities.Identity;
using System.Threading.Tasks;

namespace BibikaProject.Application.Identity.Queries
{
    public interface IRefreshTokenQuery
    {
        Task<RefreshToken> GetRefreshToken(string token);
    }
}
