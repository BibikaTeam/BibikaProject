using BibikaProject.Application.Chat.Queris;
using BibikaProject.Infrastructure.Core.Queries;

namespace BibikaProject.Infrastructure.Chat.Queries
{
    public class ChatQuery : BaseQuery<Domain.Entities.Chat.Chat, int>, IChatQuery
    {
        public ChatQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
