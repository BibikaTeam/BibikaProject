using FluentValidation;

namespace BibikaProject.Application.Core.DTO.CompleteSet
{
    public class UpdateCompleteSetDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

    public class UpdateCompleteSetDTOValidator : AbstractValidator<UpdateCompleteSetDTO>
    {
        public UpdateCompleteSetDTOValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
