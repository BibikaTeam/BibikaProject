using BibikaProject.Application.Identity.Queries;
using BibikaProject.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Identity.Queries
{
    public class RefreshTokenQuery : IRefreshTokenQuery
    {
        public RefreshTokenQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task<RefreshToken> GetRefreshTokenAsync(string token)
        {
            return await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == token);
        }
    }
}
