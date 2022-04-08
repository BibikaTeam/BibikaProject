using BibikaProject.Domain.Entities.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class CarPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Mileage { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string EngineCapacity { get; set; }

        [Required]
        public string Fuel { get; set; }

        [Required]
        public string Color { get; set; }

        public string CompleteSet { get; set; }

        [Required]
        public Brand Brand { get; set; }

        [Required]
        public Model Model { get; set; }

        [Required]
        public Generation Generation { get; set; }

        [Required]
        public CarBody CarBody { get; set; }

        [Required]
        public GearBox GearBox { get; set; }

        public ICollection<Option> Options { get; set; }

        public ICollection<Image> Images { get; set; }

        [Required]
        public ApplicationUser Seller { get; set; }    
    }
}
