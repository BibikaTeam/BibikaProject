using BibikaProject.Application.Core.DTO.Car;
using System;

namespace BibikaProject.Application.Core.DTO.Post
{
    public class PostDTO
    {
        public int Id { get; set; }

        public DateTime Year { get; set; }

        public string Location { get; set; }

        public string Color { get; set; }

        public string SellerName { get; set; }

        public CarDTO Car { get; set; }
    }
}
