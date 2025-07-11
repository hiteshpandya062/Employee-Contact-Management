﻿using System.ComponentModel.DataAnnotations;

namespace Contact.Management.Core.Entities
{
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? JobTitle { get; set; }
        public int CompanyID { get; set; }
        public Company? Company { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
