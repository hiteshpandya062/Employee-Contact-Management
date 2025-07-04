using System.Linq.Expressions;

namespace Contact.Management.Core.Interfaces.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<T?> GetByIdAsync(object id);
        IQueryable<T> GetQueryable();
    }
}
