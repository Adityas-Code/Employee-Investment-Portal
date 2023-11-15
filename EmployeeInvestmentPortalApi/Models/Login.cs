using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeInvestmentPortalApi.Models
{
    public class Login
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LoginID { get; set; }

        //[ForeignKey(nameof(Employee))]
        //[DisplayName("Employee ID")]
        //[Required(ErrorMessage = "Employee ID is required")]
        //public int EmployeeID { get; set; }

        [ForeignKey(nameof(Role))]
        [DisplayName("Role ID")]
        [Required(ErrorMessage = "Role ID is required")]
        public int RoleID { get; set; }

        [DisplayName("User Name")]
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [DisplayName("Email")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

    }
}
