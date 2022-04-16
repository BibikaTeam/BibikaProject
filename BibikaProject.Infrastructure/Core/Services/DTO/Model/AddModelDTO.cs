using FluentValidation;

namespace BibikaProject.Infrastructure.Core.Services.DTO.Model
{
    public class AddModelDTO
    {
        public string Title { get; set; }

        public int BrandId { get; set; }
    }

    public class AddModelDTOValidator : AbstractValidator<AddModelDTO>
    {
        public AddModelDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.BrandId).NotNull();
        }
    }
}
