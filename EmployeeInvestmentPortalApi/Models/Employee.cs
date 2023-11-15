using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeInvestmentPortalApi.Models
{
    public class Employee
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeID { get; set; }

        [DisplayName("Name")]
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [DisplayName("Email")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [DisplayName("Age")]
        [Required(ErrorMessage = "Age is required")]
        public int Age { get; set; }

        [DisplayName("Gender")]
        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; }

        [DisplayName("Department")]
        [Required(ErrorMessage = "Department is required")]
        public string Department { get; set; }

        [DisplayName("Contact Details")]
        [Required(ErrorMessage = "Contact Details are required")]
        public string ContactDetails { get; set; }

        [DisplayName("Grade")]
        [Required(ErrorMessage = "Grade is required")]
        public string Grade { get; set; }

        [DisplayName("Salary(Basic)")]
        [Required(ErrorMessage = "Salary is required")]
        public decimal Salary { get; set; }

    }
}
