using Contact.Management.Shared.API.DTOs;

namespace Contact.Management.Core.Interfaces.Service
{
    public interface IEmployeeService
    {
        Task Create(CreateEmployeeDto model);
        Task<bool> UpdateAsync(int id, UpdateEmployeeDto model);
        Task<bool> DeleteAsync(int id);
        Task<EmployeeDto> Get(int id);
        Task<IReadOnlyList<EmployeeDto>> GetAll(string? search, int page = 1, int pageSize = 10);
    }
}
