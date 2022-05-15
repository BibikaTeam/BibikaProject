using FluentValidation;

namespace BibikaProject.Application.Core.DTO.GearBox
{
    public class AddGearBoxDTO
    {
        public string Title { get; set; }
    }

    public class AddGearBoxDTOValidator : AbstractValidator<AddGearBoxDTO>
    {
        public AddGearBoxDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
