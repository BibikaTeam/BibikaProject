using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class OptionQuery : BaseQuery<Option, int>, IOptionQuery
    {
        public OptionQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
