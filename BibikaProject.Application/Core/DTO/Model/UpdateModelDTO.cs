using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Model
{
    public class UpdateModelDTO
    {
        public int Id { get; set; }
        
        public string Title { get; set; }
    }

    public class UpdateModelDTOValidator : AbstractValidator<UpdateModelDTO>
    {
        public UpdateModelDTOValidator()
        {
            RuleFor(x => x.Id).NotNull().GreaterThanOrEqualTo(1);
            RuleFor(x => x.Title).NotEmpty();            
        }
    }
}
