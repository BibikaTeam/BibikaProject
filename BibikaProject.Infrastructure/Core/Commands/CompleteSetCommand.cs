using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CompleteSetCommand : BaseCommand<CompleteSet, int>, ICompleteSetCommand
    {
        public CompleteSetCommand(ApplicationDbContext context) : base(context)
        {
        }        
    }
}
