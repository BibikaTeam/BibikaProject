using FluentValidation;

namespace BibikaProject.Application.Core.DTO.CompleteSet
{
    public class AddCompleteSetDTO
    {
        public string Title { get; set; }
    }

    public class AddCompleteSetDTOValidator : AbstractValidator<AddCompleteSetDTO>
    {
        public AddCompleteSetDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
