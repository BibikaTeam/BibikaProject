using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using System.Linq;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class PostQuery : BaseQuery<Post, int>, IPostQuery
    {
        public PostQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
