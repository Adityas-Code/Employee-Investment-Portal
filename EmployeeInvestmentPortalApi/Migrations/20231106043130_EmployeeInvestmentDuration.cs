using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeInvestmentPortalApi.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeInvestmentDuration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "EmployeesInvestments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "EmployeesInvestments");
        }
    }
}
