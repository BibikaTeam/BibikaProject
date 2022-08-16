using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.Services;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class UserService : IUserService
    {
        public UserService(IPostCommand command)
        {
            this.command = command;
        }

        private readonly IPostCommand command;

        public async Task LikePost(string userId, int postId)
        {
            await command.LikePost(userId, postId);

            await command.SaveChangesAsync();
        }

        public async Task ViewPost(string userId, int postId)
        {
            await command.ViewPost(userId, postId);

            await command.SaveChangesAsync();
        }
    }
}
