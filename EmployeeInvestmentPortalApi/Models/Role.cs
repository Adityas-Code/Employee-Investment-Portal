using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeInvestmentPortalApi.Models
{
    public class Role
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleID { get; set; }

        [DisplayName("Role Name")]
        [Required(ErrorMessage = "Role Name is required")]
        public string RoleName { get; set; }

    }
}
