using Microsoft.EntityFrameworkCore;

namespace EmployeeInvestmentPortalApi.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(

                new Role() { RoleID = 1, RoleName = "Admin"},
                new Role() { RoleID = 2, RoleName = "HR" },
                new Role() { RoleID = 3, RoleName = "Employee" }
            );

            modelBuilder.Entity<Status>().HasData(
                
                new Status() { StatusID = 1, StatusName = "Approved"},
                new Status() { StatusID = 2, StatusName = "Pending" },
                new Status() { StatusID = 3, StatusName = "Declined" }
            );

            modelBuilder.Entity<InvestmentPlan>().HasData(

                new InvestmentPlan() { PlanID = 1, PlanName = "Company Contribution Plan" , 
                    PlanDetail = "Designed to reward your hard work and dedication. As part of this plan, we match a percentage of your salary and contribute it towards your long term financial goals." 
                },
                new InvestmentPlan() { PlanID = 2, PlanName = "Employee Contribution Plan" , 
                    PlanDetail = "Take control of your financial future with our Employee Contribution Plan. This plan empowers you to invest a portion of your salary towards long-term goals."
                },
                new InvestmentPlan() { PlanID = 3, PlanName = "Retirement Plan" , 
                    PlanDetail = "With a range of investment options, personalized advice, and expert guidance, our Retirement Plan equips you with the tools you need for a worry-free retirement."
                }


            );
        }
    }
}
