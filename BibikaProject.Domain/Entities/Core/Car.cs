using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Car
    {
        [Key]
        public int Id { get; set; }

        public Generation Generation { get; set; }

        public CompleteSet CompleteSet { get; set; }

        public GearBox GearBox { get; set; }

        public CarBody CarBody { get; set; }

        public Engine Engine { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
