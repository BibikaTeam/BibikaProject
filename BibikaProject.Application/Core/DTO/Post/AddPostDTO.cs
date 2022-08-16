using FluentValidation;
using System;

namespace BibikaProject.Application.Core.DTO.Post
{
    public class AddPostDTO
    {
        public string Description { get; set; }

        public DateTime Year { get; set; }

        public string Location { get; set; }

        public int Mileage { get; set; }

        public string Color { get; set; }

        public string SellerId { get; set; }

        public int CarId { get; set; }

        public int Price { get; set; }
    }

    public class AddPostDTOValidator : AbstractValidator<AddPostDTO>
    {
        public AddPostDTOValidator()
        {
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Color).NotEmpty();
            RuleFor(x => x.Mileage).NotNull();
            RuleFor(x => x.Year).NotNull();
            RuleFor(x => x.SellerId).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.CarId).NotNull().GreaterThanOrEqualTo(1);
        }
    }
}