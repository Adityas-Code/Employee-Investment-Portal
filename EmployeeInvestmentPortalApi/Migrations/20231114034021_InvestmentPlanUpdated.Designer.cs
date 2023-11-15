﻿// <auto-generated />
using System;
using EmployeeInvestmentPortalApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeeInvestmentPortalApi.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20231114034021_InvestmentPlanUpdated")]
    partial class InvestmentPlanUpdated
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("ContactDetails")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Grade")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Salary")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("EmployeeID");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.EmployeeInvestment", b =>
                {
                    b.Property<int>("EmployeeInvestmentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeInvestmentID"));

                    b.Property<int?>("Duration")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("LoginID")
                        .HasColumnType("int");

                    b.Property<int>("PlanID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("StatusID")
                        .HasColumnType("int");

                    b.HasKey("EmployeeInvestmentID");

                    b.ToTable("EmployeesInvestments");
                });

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.InvestmentPlan", b =>
                {
                    b.Property<int>("PlanID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlanID"));

                    b.Property<string>("PlanDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PlanID");

                    b.ToTable("InvestmentPlans");

                    b.HasData(
                        new
                        {
                            PlanID = 1,
                            PlanDetail = "Designed to reward your hard work and dedication. As part of this plan, we match a percentage of your salary and contribute it towards your long term financial goals.",
                            PlanName = "Company Contribution Plan"
                        },
                        new
                        {
                            PlanID = 2,
                            PlanDetail = "Take control of your financial future with our Employee Contribution Plan. This plan empowers you to invest a portion of your salary towards long-term goals.",
                            PlanName = "Employee Contribution Plan"
                        },
                        new
                        {
                            PlanID = 3,
                            PlanDetail = "With a range of investment options, personalized advice, and expert guidance, our Retirement Plan equips you with the tools you need for a worry-free retirement.",
                            PlanName = "Retirement Plan"
                        });
                });

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.Login", b =>
                {
                    b.Property<int>("LoginID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LoginID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleID")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LoginID");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.Role", b =>
                {
                    b.Property<int>("RoleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleID"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleID");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleID = 1,
                            RoleName = "Admin"
                        },
                        new
                        {
                            RoleID = 2,
                            RoleName = "HR"
                        },
                        new
                        {
                            RoleID = 3,
                            RoleName = "Employee"
                        });
                });

            modelBuilder.Entity("EmployeeInvestmentPortalApi.Models.Status", b =>
                {
                    b.Property<int>("StatusID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StatusID"));

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StatusID");

                    b.ToTable("Status");

                    b.HasData(
                        new
                        {
                            StatusID = 1,
                            StatusName = "Approved"
                        },
                        new
                        {
                            StatusID = 2,
                            StatusName = "Pending"
                        },
                        new
                        {
                            StatusID = 3,
                            StatusName = "Declined"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}