using BibikaProject.Application.Chat.Commands;
using BibikaProject.Infrastructure.Core.Commands;

namespace BibikaProject.Infrastructure.Chat.Commands
{
    public class ChatCommand : BaseCommand<Domain.Entities.Chat.Chat, int>, IChatCommand
    {
        public ChatCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
