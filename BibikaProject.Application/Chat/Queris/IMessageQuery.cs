using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Chat;

namespace BibikaProject.Application.Chat.Queris
{
    public interface IMessageQuery : IBaseQuery<Message, int>
    {
    }
}
