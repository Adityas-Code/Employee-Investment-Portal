using Microsoft.EntityFrameworkCore;

namespace EmployeeInvestmentPortalApi.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<InvestmentPlan> InvestmentPlans { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<EmployeeInvestment> EmployeesInvestments { get; set; }
        


    }
}
