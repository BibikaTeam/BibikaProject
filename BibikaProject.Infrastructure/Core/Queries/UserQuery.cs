using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Identity;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class UserQuery : BaseQuery<ApplicationUser, string>, IUserQuery
    {
        public UserQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
