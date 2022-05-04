using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CarQuery : BaseQuery<Car, int>, ICarQuery
    {
        public CarQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
