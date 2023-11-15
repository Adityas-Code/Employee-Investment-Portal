using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeInvestmentPortalApi.Models
{
    public class InvestmentPlan
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlanID { get; set; }

        [DisplayName("Plan Name")]
        [Required(ErrorMessage = "Plan Name is required")]
        public string PlanName { get; set; }

        [DisplayName("Plan Detail")]
        [Required(ErrorMessage = "Plan Detail is required")]
        public string PlanDetail { get; set; }

    }
}
