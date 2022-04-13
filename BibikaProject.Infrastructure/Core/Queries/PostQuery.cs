using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class PostQuery : IPostQuery
    {
        public PostQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<Post> GetAllPostsAsync()
        {
            return context.Posts.AsQueryable();
        }

        public async Task<Post> GetPostIdAsync(int id)
        {
            return await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
