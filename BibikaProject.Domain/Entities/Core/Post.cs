using BibikaProject.Domain.Entities.Identity;
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

        [Required]
        public int Price { get; set; }

        public int CarId { get; set; }

        public string SellerId { get; set; }

        public DateTime CreatedAt { get; set; }

        [Required]
        public ApplicationUser Seller { get; set; }

        public ICollection<Image> Images { get; set; }

        public ICollection<Option> Options { get; set; }

        public ICollection<ApplicationUser> Likes { get; set; }

        public ICollection<ApplicationUser> Views { get; set; }

        [Required]
        public Car Car { get; set; }

        // ADVERTISMENT

        public bool IsBanner { get; set; }

        public bool IsTrend { get; set; }

        public int DailyPoint { get; set; }

        public int DailyViews { get; set; }

        public int Balance { get; set; }

        public int BannerShowsLeft { get; set; }

        public int TrendShowsLeft { get; set; }

        public string Status { get; set; }
    }

    public static class PostStatusTypes
    {
        public static string Active => "Active";

        public static string Deactivated => "Deactivated";

        public static string Sold => "Sold";
    }
}
