using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class GearBoxQuery : BaseQuery<GearBox, int>, IGearBoxQuery
    {
        public GearBoxQuery(ApplicationDbContext context) : base(context)
        {
        }   
    }
}
