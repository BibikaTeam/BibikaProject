using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class ImageQuery : BaseQuery<Image, int>, IImageQuery
    {
        public ImageQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
