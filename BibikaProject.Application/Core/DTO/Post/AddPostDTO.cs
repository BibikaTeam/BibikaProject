using FluentValidation;
using System.Collections.Generic;

namespace BibikaProject.Application.Core.DTO.Post
{
    public class AddPostDTO
    {
        public string Description { get; set; }
        public int Year { get; set; }
        public string Location { get; set; }
        public string Color { get; set; }
        public int SellerId { get; set; }
        public int CarId { get; set; }
        public List<int> OptionsList { get; set; }
        public List<string> ImagesBase64 { get; set; }
    }
    public class AddPostDTOValidator : AbstractValidator<AddPostDTO>
    {
        public AddPostDTOValidator()
        {
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Color).NotEmpty();
            RuleFor(x => x.OptionsList).NotEmpty();
            RuleFor(x => x.ImagesBase64).NotEmpty();
        }
    }
}