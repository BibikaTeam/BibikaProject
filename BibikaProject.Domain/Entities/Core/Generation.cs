using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Generation : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        public int ModelId { get; set; }

        public Model Model { get; set; }

        public ICollection<Car> Cars { get; set; }
    }
}
