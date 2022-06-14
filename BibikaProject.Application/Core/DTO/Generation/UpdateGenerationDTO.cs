using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Generation
{
    public class UpdateGenerationDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }       
    }

    public class UpdateGenerationDTOValidator : AbstractValidator<UpdateGenerationDTO>
    {
        public UpdateGenerationDTOValidator()
        {
            RuleFor(x => x.Id).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
