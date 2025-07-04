using Contact.Management.Core.Interfaces;
using Contact.Management.Core.Interfaces.Repository;
using Contact.Management.Infrastructure.Data;
using System.Collections;

namespace Contact.Management.Infrastructure.Repositiories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDBContext _appDbContext;

        private Hashtable? _repositories;


        public UnitOfWork(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;

            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class
        {

            if (_repositories == null) _repositories = new Hashtable();
            var Type = typeof(TEntity).Name;
            if (!_repositories.ContainsKey(Type))
            {
                var repositiryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(
                    repositiryType.MakeGenericType(typeof(TEntity)), _appDbContext);
                _repositories.Add(Type, repositoryInstance);
            }
            return (IGenericRepository<TEntity>)_repositories[Type]!;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _appDbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
