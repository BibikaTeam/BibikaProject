using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IBaseQuery<TEntity, TIdType>
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetByIdAsync(TIdType id);
    }
}
