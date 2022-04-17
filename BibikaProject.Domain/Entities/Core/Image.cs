using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public Post Post { get; set; }
    }
}
