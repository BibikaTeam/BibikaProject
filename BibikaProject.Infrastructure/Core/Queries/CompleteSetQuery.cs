using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class CompleteSetQuery : BaseQuery<CompleteSet, int>, ICompleteSetQuery
    {
        public CompleteSetQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
