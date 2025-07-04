using Contact.Management.Application.Services;
using Contact.Management.Core.Interfaces.Repository;
using Contact.Management.Core.Interfaces.Service;
using Contact.Management.Infrastructure.Repositiories;

namespace Contact.Management.API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IEmployeeService, EmployeeService>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
