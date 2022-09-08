using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class ViewPostQuery : BaseQuery<ViewPost, int>, IViewPostQuery
    {
        public ViewPostQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
