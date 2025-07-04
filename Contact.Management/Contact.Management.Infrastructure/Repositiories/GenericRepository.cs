using Contact.Management.Core.Interfaces.Repository;
using Contact.Management.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Contact.Management.Infrastructure.Repositiories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDBContext _appDbContext;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                return entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Attach(entity);
                _appDbContext.Entry(entity).State = EntityState.Modified;
                return Task.CompletedTask;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task DeleteAsync(T entity)
        {
            try
            {
                _dbSet.Remove(entity);
                return Task.CompletedTask;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<T?> GetByIdAsync(object id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<T> GetQueryable()
        {
            try
            {
                return _dbSet.AsQueryable();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
