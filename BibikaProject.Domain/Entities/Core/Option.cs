using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Option : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Category { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
