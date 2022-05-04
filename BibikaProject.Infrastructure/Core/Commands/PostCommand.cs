using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class PostCommand : BaseCommand<Post, int>, IPostCommand
    {
        public PostCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
