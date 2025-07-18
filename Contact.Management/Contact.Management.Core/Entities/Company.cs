﻿using System.ComponentModel.DataAnnotations;

namespace Contact.Management.Core.Entities
{
    public class Company
    {
        [Key]
        public int ID { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string? Industry { get; set; }
        public string? Website { get; set; }

        public ICollection<Employee>? Employees { get; set; }
    }
}
