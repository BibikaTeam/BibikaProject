using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class PostCommand : IPostCommand
    {
        public PostCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddPostAsync(Post post)
        {
            await context.Posts.AddAsync(post);
        }

        public void DeletePost(int id)
        {
            context.Posts.Remove(context.Posts.FirstOrDefault(x => x.Id == id));
        }

        public void UpdatePost(Post post)
        {
            context.Posts.Update(post);
        }
 
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
