using BibikaProject.Application.Identity.Requests;
using BibikaProject.Application.Identity.Responses;
using BibikaProject.Domain.Entities.Identity;
using System.Threading.Tasks;

namespace BibikaProject.Application.Identity.Services
{
    public interface IAuthService
    {
        Task<TokenResponse> LoginAsync(UserLoginRequest request);

        Task<ApplicationUser> RegisterAsync(UserRegisterRequest request);

        Task<TokenResponse> RefreshAsync(RefreshTokenRequest request);
    }
}
