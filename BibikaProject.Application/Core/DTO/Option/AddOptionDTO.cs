using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Option
{
    public class AddOptionDTO
    {
        public string Title { get; set; }

        public string Category { get; set; }
    }

    public class AddOptionDTOValidator : AbstractValidator<AddOptionDTO>
    {
        public AddOptionDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}
