using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CarBodyQuery : BaseQuery<CarBody, int>, ICarBodyQuery
    {
        public CarBodyQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
