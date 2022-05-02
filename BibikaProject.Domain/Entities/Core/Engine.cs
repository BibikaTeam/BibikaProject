using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Engine
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Capacity { get; set; }

        [Required]
        public int KWPower { get; set; }

        [Required]
        public string Fuel { get; set; }

        public ICollection<Car> Cars { get; set; }
    }
}
