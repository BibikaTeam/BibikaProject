using BibikaProject.Application.Core.Commands;

namespace BibikaProject.Application.Chat.Commands
{
    public interface IChatCommand : IBaseCommand<Domain.Entities.Chat.Chat, int>
    {
    }
}
