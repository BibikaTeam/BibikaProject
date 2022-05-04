using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Commands
{
    public interface IBaseCommand<TEntity, TIdType>
    {
        Task AddAsync(TEntity entity);

        void Update(TEntity entity);

        void Delete(TIdType id);

        Task SaveChangesAsync();
    }
}
