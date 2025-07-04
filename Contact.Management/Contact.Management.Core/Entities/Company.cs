using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contact.Management.Core.Entities
{
    public class Company
    {
        public int ID { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string? Industry { get; set; }
        public string? Website { get; set; }

        public ICollection<Employee>? Employees { get; set; }
    }
}
