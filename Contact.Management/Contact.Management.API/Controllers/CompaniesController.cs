using Contact.Management.Core.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Contact.Management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _companyService.GetAll();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
