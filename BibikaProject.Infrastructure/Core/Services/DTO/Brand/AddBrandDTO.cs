using FluentValidation;

namespace BibikaProject.Infrastructure.Core.Services.DTO.Brand
{
    public class AddBrandDTO
    {
        public string Title { get; set; }
    }

    public class AddBrandDTOValidator : AbstractValidator<AddBrandDTO>
    {
        public AddBrandDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
