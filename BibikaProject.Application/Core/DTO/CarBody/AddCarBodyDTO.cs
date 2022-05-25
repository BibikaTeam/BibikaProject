using FluentValidation;

namespace BibikaProject.Application.Core.DTO.CarBody
{
    public class AddCarBodyDTO
    {
        public string Title { get; set; }
    }
       
    public class AddCarBodyDTOValidator : AbstractValidator<AddCarBodyDTO>
    {
        public AddCarBodyDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
