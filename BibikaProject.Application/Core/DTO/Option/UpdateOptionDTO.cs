using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Option
{
    public class UpdateOptionDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }
    }

    public class UpdateOptionDTOValidator : AbstractValidator<UpdateOptionDTO>
    {
        public UpdateOptionDTOValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}
