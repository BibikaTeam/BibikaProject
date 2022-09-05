using BibikaProject.Application.Chat.Queris;
using BibikaProject.Domain.Entities.Chat;
using BibikaProject.Infrastructure.Core.Queries;

namespace BibikaProject.Infrastructure.Chat.Queries
{
    public class MessageQuery : BaseQuery<Message, int>, IMessageQuery
    {
        public MessageQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
