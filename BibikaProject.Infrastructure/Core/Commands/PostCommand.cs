using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class PostCommand : BaseCommand<Post, int>, IPostCommand
    {
        public PostCommand(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddImagesToPost(int postId, List<int> imagesId)
        {
            var post = await context.Posts.FindAsync(postId);

            imagesId.ForEach(imageId => context.Images.Find(imageId).PostId = post.Id);
        }

        public async Task AddOptionsToPost(int postId, List<int> optionsId)
        {
            var post = await context.Posts.FindAsync(postId);

            if(post.Options == null)
            {
                post.Options = new List<Option>();
            }

            optionsId.ForEach(optionId => post.Options.Add(context.Options.Find(optionId)));
        }
    }
}
