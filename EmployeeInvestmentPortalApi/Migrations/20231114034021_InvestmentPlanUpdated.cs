using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeInvestmentPortalApi.Migrations
{
    /// <inheritdoc />
    public partial class InvestmentPlanUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlanDetail",
                table: "InvestmentPlans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "InvestmentPlans",
                keyColumn: "PlanID",
                keyValue: 1,
                column: "PlanDetail",
                value: "Designed to reward your hard work and dedication. As part of this plan, we match a percentage of your salary and contribute it towards your long term financial goals.");

            migrationBuilder.UpdateData(
                table: "InvestmentPlans",
                keyColumn: "PlanID",
                keyValue: 2,
                column: "PlanDetail",
                value: "Take control of your financial future with our Employee Contribution Plan. This plan empowers you to invest a portion of your salary towards long-term goals.");

            migrationBuilder.UpdateData(
                table: "InvestmentPlans",
                keyColumn: "PlanID",
                keyValue: 3,
                column: "PlanDetail",
                value: "With a range of investment options, personalized advice, and expert guidance, our Retirement Plan equips you with the tools you need for a worry-free retirement.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanDetail",
                table: "InvestmentPlans");
        }
    }
}
