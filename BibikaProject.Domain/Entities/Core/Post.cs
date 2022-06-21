﻿using BibikaProject.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Post : BaseEntity<int>
    {
        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Year { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public int Mileage { get; set; }

        public int CarId { get; set; }
        public string SellerId { get; set; }

        [Required]
        public ApplicationUser Seller { get; set; }

        public ICollection<Image> Images { get; set; }

        public ICollection<Option> Options { get; set; }

        [Required]
        public Car Car { get; set; }
    }
}
