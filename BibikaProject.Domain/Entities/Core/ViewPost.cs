using BibikaProject.Domain.Entities.Identity;

namespace BibikaProject.Domain.Entities.Core
{
    public class ViewPost : BaseEntity<int>
    {
        public string UserId { get; set; }

        public ApplicationUser User{ get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }
    }
}
