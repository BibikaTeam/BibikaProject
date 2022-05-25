using FluentValidation;

namespace BibikaProject.Application.Core.DTO.CarBody
{
    public class UpdateCarBodyDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

    public class UpdateCarBodyDTOValidator : AbstractValidator<UpdateCarBodyDTO>
    {
        public UpdateCarBodyDTOValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
