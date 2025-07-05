using Contact.Management.Core.Entities;
using Contact.Management.Core.Interfaces.Repository;
using Contact.Management.Core.Interfaces.Service;
using Contact.Management.Shared.API.DTOs;

namespace Contact.Management.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork _unitOfWork;

        public EmployeeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Create(CreateEmployeeDto model)
        {
            Employee employee = new Employee()
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                JobTitle = model.JobTitle,
                CompanyID = model.CompanyId,
                IsActive = model.IsActive
            };

            await _unitOfWork.Repository<Employee>().AddAsync(employee);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id);
            if (employee == null) return false;

            await _unitOfWork.Repository<Employee>().DeleteAsync(employee);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<EmployeeDto> Get(int id)
        {
            var result = _unitOfWork.Repository<Employee>().GetQueryable().Select(x => new EmployeeDto {
                ID = x.ID,
                Name = x.Name,
                Email = x.Email,
                Phone = x.Phone,
                JobTitle = x.JobTitle,
                CompanyName = x.Company.CompanyName,
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt
            }).FirstOrDefault(x => x.ID == id); 

            return result;
        }

        public async Task<PageResult<EmployeeDto>> GetAll(string? search, int page = 1, int pageSize = 10)
        {
            var query = _unitOfWork.Repository<Employee>().GetQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Email.Contains(search));
            }

            var totalCount = query.Count();

            var data = query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new EmployeeDto
                {
                    ID = x.ID,
                    Name = x.Name,
                    Email = x.Email,
                    Phone = x.Phone,
                    JobTitle = x.JobTitle,
                    CompanyName = x.Company!.CompanyName,
                    CompanyID = x.CompanyID,
                    IsActive = x.IsActive,
                    CreatedAt = x.CreatedAt
                })
                .ToList();

            return await Task.FromResult(new PageResult<EmployeeDto>
            {
                Data = data,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            });
        }

        public async Task<bool> UpdateAsync(int id, UpdateEmployeeDto model)
        {
            var employee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id);
            if (employee == null) return false;

            employee.Name = model.Name;
            employee.Email = model.Email;
            employee.Phone = model.Phone;
            employee.JobTitle = model.JobTitle;
            employee.CompanyID = model.CompanyId;
            employee.IsActive = model.IsActive;

            await _unitOfWork.Repository<Employee>().UpdateAsync(employee);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
