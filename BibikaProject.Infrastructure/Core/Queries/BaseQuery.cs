using BibikaProject.Application.Core.Queries;
using BibikaProject.Domain.Entities;
using BibikaProject.Infrastructure.Core.Errors;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Queries
{
    public class BaseQuery<TEntity, TIdType> : IBaseQuery<TEntity, TIdType> where TEntity : class, IEntity<TIdType>
    {
        public BaseQuery(ApplicationDbContext context)
        {
            this.context = context;
        }

        private readonly ApplicationDbContext context;

        public IQueryable<TEntity> GetAll()
        {
            return context.Set<TEntity>().AsQueryable<TEntity>();
        }

        public async Task<TEntity> GetByIdAsync(TIdType id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);

            if (entity == null)
            {
                throw new NotFoundException("There is no entity with this id.");
            }

            return entity;
        }
    }
}
