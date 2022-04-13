using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class CompleteSetCommand : ICompleteSetCommand
    {
        public CompleteSetCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public async Task AddCompleteSetAsync(CompleteSet completeSet)
        {
            await context.CompleteSets.AddAsync(completeSet);
        }

        public void DeleteCompleteSet(int id)
        {
            context.CompleteSets.Remove(context.CompleteSets.FirstOrDefault(x => x.Id == id));
        }

        public void UpdateCompleteSet(CompleteSet completeSet)
        {
            context.CompleteSets.Update(completeSet);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

    }
}
