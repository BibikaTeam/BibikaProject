using FluentValidation;

namespace BibikaProject.Infrastructure.Core.Services.DTO.Generation
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
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
