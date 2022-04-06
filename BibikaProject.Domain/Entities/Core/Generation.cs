using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Generation
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime YearFrom { get; set; }

        public DateTime YearTo { get; set; }

        public ICollection<CarPost> CarPosts { get; set; }
    }
}
