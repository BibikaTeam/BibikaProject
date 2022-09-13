using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities;
using BibikaProject.Infrastructure.Core.Errors;
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

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            await context.AddAsync(entity);

            return entity;
        }

        public virtual void Delete(TIdType id)
        {
            var entity = context.Set<TEntity>().Find(id);

            if (entity == null)
            {
                throw new BadRequestException("There is no entity with this id.");
            }

            context.Remove(entity);
        }

        public virtual async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public virtual void Update(TEntity entity)
        {
            var temp = context.Find<TEntity>(entity.Id);

            if (temp == null)
            {
                throw new NotFoundException("There is no entity with this id.");
            }

            context.Entry(temp).State = Microsoft.EntityFrameworkCore.EntityState.Detached;

            context.Update(entity);
        }
    }
}
