using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class CarBody
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public ICollection<Car> Cars { get; set; }

    }
}
