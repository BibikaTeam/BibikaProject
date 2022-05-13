using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Engine
{
    public class UpdateEngineDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Capacity { get; set; }

        public int KWPower { get; set; }

        public string Fuel { get; set; }
    }

    public class UpdateEngineDTOValidator : AbstractValidator<UpdateEngineDTO>
    {
        public UpdateEngineDTOValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Capacity).NotEmpty();
            RuleFor(x => x.KWPower).NotNull();
            RuleFor(x => x.Fuel).NotEmpty();
        }
    }
}
