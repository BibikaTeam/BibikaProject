using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Model
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public int BrandId { get; set; }

        public Brand Brand { get; set; }

        public ICollection<Generation> Generations { get; set; }
    }
}
