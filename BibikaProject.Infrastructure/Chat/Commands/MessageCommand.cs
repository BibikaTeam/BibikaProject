using BibikaProject.Application.Chat.Commands;
using BibikaProject.Domain.Entities.Chat;
using BibikaProject.Infrastructure.Core.Commands;

namespace BibikaProject.Infrastructure.Chat.Commands
{
    public class MessageCommand : BaseCommand<Message, int>, IMessageCommand
    {
        public MessageCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
