using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class BaseCommand<TEntity, TIdType> : IBaseCommand<TEntity, TIdType> where TEntity : class, IEntity<TIdType>
    {
        public BaseCommand(ApplicationDbContext context)
        {
            this.context = context;
        }

        protected readonly ApplicationDbContext context;

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await context.AddAsync(entity);

            return entity;
        }

        public void Delete(TIdType id)
        {
            context.Remove(context.Set<TEntity>().Find(id));
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public void Update(TEntity entity)
        {
            context.Update(entity);
        }
    }
}
