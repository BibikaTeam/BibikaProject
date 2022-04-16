using FluentValidation;

namespace BibikaProject.Infrastructure.Core.Services.DTO.Car
{
    public class AddCarDTO
    {
        public int GenerationId { get; set; }

        public int EngineId { get; set; }

        public int CarBodyId { get; set; }

        public int CompleteSetId { get; set; }
    }

    public class AddCarDTOValidator : AbstractValidator<AddCarDTO>
    {
        public AddCarDTOValidator()
        {
            RuleFor(x => x.GenerationId).NotNull();
            RuleFor(x => x.EngineId).NotNull();
            RuleFor(x => x.CarBodyId).NotNull();
            RuleFor(x => x.CompleteSetId).NotNull();
        }
    }
}
