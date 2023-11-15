using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using EmployeeInvestmentPortalApi.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace EmployeeInvestmentPortalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly AppDBContext _context;

        public UploadController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }


        // POST: api/Upload
        [HttpPost]

        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            Employee employee;
            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, System.Globalization.CultureInfo.InvariantCulture))

            {
                var records = csv.GetRecords<Employee>();

                foreach (var record in records)
                {

                    if (record != null)
                    {
                        employee = new Employee

                        {
                            Name = record.Name,
                            Email = record.Email,
                            Age = record.Age,
                            Gender = record.Gender,
                            Department = record.Department,
                            ContactDetails = record.ContactDetails,
                            Grade = record.Grade,
                            Salary = record.Salary
                        };

                        _context.Employees.Add(employee);
                    }
                }
                await _context.SaveChangesAsync();
            }


            return Ok("File uploaded successfully");
        }
    }
}