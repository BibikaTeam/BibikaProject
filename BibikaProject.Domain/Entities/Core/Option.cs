using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Option
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }

        public ICollection<CarPost> CarPosts { get; set; }
    }
}
