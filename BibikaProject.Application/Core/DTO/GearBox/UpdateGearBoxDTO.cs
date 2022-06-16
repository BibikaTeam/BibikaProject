using FluentValidation;

namespace BibikaProject.Application.Core.DTO.GearBox
{
    public class UpdateGearBoxDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

    public class UpdateGearBoxDTOValidator : AbstractValidator<UpdateGearBoxDTO>
    {
        public UpdateGearBoxDTOValidator()
        {
            RuleFor(x => x.Id).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.Title).NotEmpty();
        }
    }

}
