using BibikaProject.Domain.Entities.Identity;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Image : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        public Post Post { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}
