using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class EngineQuery : BaseQuery<Engine, int>, IEngineQuery
    {
        public EngineQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
