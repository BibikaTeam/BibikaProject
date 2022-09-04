using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Chat;

namespace BibikaProject.Application.Chat.Commands
{
    public interface IMessageCommand : IBaseCommand<Message, int>
    {
    }
}
