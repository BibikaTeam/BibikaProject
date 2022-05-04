using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class ModelQuery : BaseQuery<Model, int>, IModelQuery
    {
        public ModelQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
