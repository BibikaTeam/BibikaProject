using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Car
{
    public class UpdateCarDTO
    {
        public int CarId { get; set; }

        public int GenerationId { get; set; }

        public int EngineId { get; set; }

        public int CarBodyId { get; set; }

        public int CompleteSetId { get; set; }

        public int GearBoxId { get; set; }
    }

    public class UpdateCarDTOValidator : AbstractValidator<UpdateCarDTO>
    {
        public UpdateCarDTOValidator()
        {
            RuleFor(x => x.CarId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.GenerationId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.EngineId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.CarBodyId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.CompleteSetId).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.GearBoxId).NotNull().GreaterThanOrEqualTo(1);
        }
    }
}
