using FluentValidation;
using System.Collections.Generic;

namespace BibikaProject.Application.Core.DTO.Post
{
    public class AddImagesToPostDTO
    {
        public int PostId { get; set; }

        public List<int> ImagesId { get; set; }
    }

    public class AddImagesToPostDTOValidator : AbstractValidator<AddImagesToPostDTO>
    {
        public AddImagesToPostDTOValidator()
        {
            RuleFor(x => x.PostId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.ImagesId).NotEmpty();
        }
    }
}
