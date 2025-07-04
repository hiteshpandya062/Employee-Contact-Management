using Contact.Management.Shared.API.DTOs;

namespace Contact.Management.Core.Interfaces.Service
{
    public interface ICompanyService
    {
        Task<IReadOnlyList<CompanyDto>> GetAll();
    }
}
