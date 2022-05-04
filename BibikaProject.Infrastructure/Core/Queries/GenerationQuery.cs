using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class GenerationQuery : BaseQuery<Generation, int>, IGenerationQuery
    {
        public GenerationQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
