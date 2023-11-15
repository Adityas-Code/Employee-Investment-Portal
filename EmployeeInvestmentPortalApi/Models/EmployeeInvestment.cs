using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeInvestmentPortalApi.Models
{
    public class EmployeeInvestment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeInvestmentID { get; set; }

        [ForeignKey(nameof(Employee))]
        [DisplayName("Employee ID")]
        [Required(ErrorMessage = "Employee ID is required")]
        public int EmployeeID { get; set; }

        [ForeignKey(nameof(Login))]
        [DisplayName("Login ID")]
        [Required(ErrorMessage = "Login ID is required")]
        public int LoginID { get; set; }

        [ForeignKey(nameof(InvestmentPlan))]
        [DisplayName("Plan ID")]
        [Required(ErrorMessage = "Plan ID is required")]
        public int PlanID { get; set; }

        [ForeignKey(nameof(Status))]
        [DisplayName("Status ID")]
        [Required(ErrorMessage = "Status ID is required")]
        public int StatusID { get; set; }

        [DisplayName("Plan Start Date")]
        public DateTime? StartDate { get; set; }

        [DisplayName("Plan End Date")]
        public DateTime? EndDate { get; set; }

        [DisplayName("Duration")]
        public int? Duration { get; set; }

    }
}
