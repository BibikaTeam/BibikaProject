using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Brand
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
