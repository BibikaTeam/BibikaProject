using FluentValidation;

namespace BibikaProject.Infrastructure.Core.Services.DTO.Generation
{
    public class AddGenerationDTO
    {
        public string Title { get; set; }

        public int ModelId { get; set; }
    }

    public class AddGenerationDTOValidator : AbstractValidator<AddGenerationDTO>
    {
        public AddGenerationDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.ModelId).NotNull();
        }
    }
}
