using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class BrandQuery : BaseQuery<Brand, int>, IBrandQuery
    {
        public BrandQuery(ApplicationDbContext context)  : base(context)
        {
        }
    }
}
