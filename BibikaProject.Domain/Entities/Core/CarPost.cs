using BibikaProject.Domain.Entities.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class CarPost
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Mileage { get; set; }

        public string Location { get; set; }

        public string Engine { get; set; }

        public string Color { get; set; }

        public string GearBox { get; set; }

        public Brand Brand { get; set; }

        public Model Model { get; set; }

        public Generation Generation { get; set; }

        public CarBody CarBody { get; set; }

        public ICollection<Option> Options { get; set; }

        public ICollection<Image> Images { get; set; }

        public ApplicationUser Seller { get; set; }

        // public string OptionName { get; set; }
    }
}
