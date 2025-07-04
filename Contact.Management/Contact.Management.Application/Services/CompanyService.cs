using Contact.Management.Core.Entities;
using Contact.Management.Core.Interfaces.Repository;
using Contact.Management.Core.Interfaces.Service;
using Contact.Management.Shared.API.DTOs;

namespace Contact.Management.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompanyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IReadOnlyList<CompanyDto>> GetAll()
        {
            return _unitOfWork.Repository<Company>().GetQueryable().Select(x => new CompanyDto
            {
                ID = x.ID,
                CompanyName = x.CompanyName,
                Domain = x.Domain,
                Industry = x.Industry,
                Website = x.Website
            }).ToList();
        }
    }
}
