namespace Contact.Management.Shared.API.DTOs
{
    public class CreateEmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? JobTitle { get; set; }
        public int CompanyId { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
