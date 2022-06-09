using System.Linq;
using System.Linq.Dynamic.Core;

namespace BibikaProject.Infrastructure.Core.Services.Helpers
{
    public static class IQueryableExtension
    {
        public static IQueryable<T> GetPage<T>(this IQueryable<T> queryable, int page, int countOnPage)
        {
            return queryable.Skip((page - 1) * countOnPage)
                            .Take(countOnPage);
        }

        public static IQueryable<T> Search<T>(this IQueryable<T> queryable, string search, string[] properties)
        {
            if(string.IsNullOrEmpty(search)) 
            {
                return queryable; 
            }          

            foreach (var item in properties)
            {
                queryable = queryable.Search(search, item);
            }

            return queryable;
        }

        public static IQueryable<T> Search<T>(this IQueryable<T> queryable, string search, string property)
        {
            if (string.IsNullOrEmpty(search) || string.IsNullOrEmpty(property))
            {
                return queryable;
            }

           return queryable.Where($"{property}.Contains(@0)", search);
        }
    }
}
