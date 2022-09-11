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

        public int Mileage { get; set; }

        public string SellerName { get; set; }
        public string SellerId { get; set; }
        public string SellerEmail { get; set; }

        public int Likes { get; set; }

        public int Viewes { get; set; }

        public CarDTO Car { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public bool WasInUse { get; set; }

        public string TechnicalCondition { get; set; }
    }
}
