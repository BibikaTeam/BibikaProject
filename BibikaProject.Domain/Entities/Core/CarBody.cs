using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class CarBody : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        public ICollection<Car> Cars { get; set; }

    }
}
