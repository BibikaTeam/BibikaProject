using FluentValidation;
using System.Collections.Generic;

namespace BibikaProject.Application.Core.DTO.Post
{
    public class AddOptionsToPostDTO
    {
        public int PostId { get; set; }

        public List<int> OptionsId { get; set; }
    }

    public class AddOptionsToPostDTOValidator : AbstractValidator<AddOptionsToPostDTO>
    {
        public AddOptionsToPostDTOValidator()
        {
            RuleFor(x => x.PostId).NotNull();
            RuleFor(x => x.OptionsId).NotEmpty();
        }
    }
}
