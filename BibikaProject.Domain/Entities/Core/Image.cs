﻿using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public CarPost CarPost { get; set; }
    }
}
