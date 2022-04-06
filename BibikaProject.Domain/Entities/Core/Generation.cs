using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Generation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime YearFrom { get; set; }

        [Required]
        public DateTime YearTo { get; set; }

        public ICollection<CarPost> CarPosts { get; set; }
    }
}
