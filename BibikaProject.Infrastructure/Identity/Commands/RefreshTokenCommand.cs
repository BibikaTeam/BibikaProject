using BibikaProject.Application.Identity.Commands;
using BibikaProject.Domain.Entities.Identity;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Identity.Commands
{
    public class RefreshTokenCommand : IRefreshTokenCommand
    {
        public RefreshTokenCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddRefreshTokenAsync(RefreshToken token)
        {
            await context.RefreshTokens.AddAsync(token);
        }

        public void UpdateRefreshToken(RefreshToken token)
        {
            context.RefreshTokens.Update(token);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
