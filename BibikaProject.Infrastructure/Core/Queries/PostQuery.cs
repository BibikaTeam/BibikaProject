using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class PostQuery : BaseQuery<Post, int>, IPostQuery
    {
        public PostQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
