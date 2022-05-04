using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Brand : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        public ICollection<Model> Models { get; set; }
    }
}
