using Contact.Management.Core.Interfaces.Service;
using Contact.Management.Shared.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Contact.Management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var response = await _employeeService.GetAll(search, page, pageSize);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var response = await _employeeService.Get(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> Create([FromBody] CreateEmployeeDto model)
        {
            try
            {
                await _employeeService.Create(model);
                return Ok("Employee details is added!");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto model)
        {
            try
            {
                var result = await _employeeService.UpdateAsync(id, model);
                if (result)
                    return Ok("Employee details updated!");
                else
                    return NotFound("Employee details not found in system!");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _employeeService.DeleteAsync(id);
                if (result)
                    return Ok("Employee deleted!");
                else
                    return NotFound("Employee details not found in system!");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
