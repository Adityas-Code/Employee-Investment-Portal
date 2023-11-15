using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeInvestmentPortalApi.Models;

namespace EmployeeInvestmentPortalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeInvestmentsController : ControllerBase
    {
        private readonly AppDBContext _context;

        public EmployeeInvestmentsController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeInvestments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeInvestment>>> GetEmployeesInvestments()
        {
            return await _context.EmployeesInvestments.ToListAsync();
        }

        // GET: api/EmployeeInvestments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeInvestment>> GetEmployeeInvestment(int id)
        {
            var employeeInvestment = await _context.EmployeesInvestments.FindAsync(id);

            if (employeeInvestment == null)
            {
                return NotFound();
            }

            return employeeInvestment;
        }

        // PUT: api/EmployeeInvestments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeInvestment(int id, EmployeeInvestment employeeInvestment)
        {
            if (id != employeeInvestment.EmployeeInvestmentID)
            {
                return BadRequest();
            }

            _context.Entry(employeeInvestment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeInvestmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeInvestments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeInvestment>> PostEmployeeInvestment(EmployeeInvestment employeeInvestment)
        {
            if (employeeInvestment == null || employeeInvestment.EmployeeID == 0 || employeeInvestment.PlanID == 0 || employeeInvestment.Duration == 0)
            {
                //return BadRequest("Invalid enrollment request.");
            }

            //var newEmployeeInvestment = new EmployeeInvestment
            //{
            //    EmployeeID = employeeInvestment.EmployeeID,
            //    LoginID = employeeInvestment.LoginID,
            //    PlanID = employeeInvestment.PlanID,
            //    StatusID = 2, //pending  
            //    StartDate = employeeInvestment.StartDate,
            //    EndDate = employeeInvestment.EndDate,
            //    Duration = employeeInvestment.Duration

            //};

            _context.EmployeesInvestments.Add(employeeInvestment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeInvestment", new { id = employeeInvestment.EmployeeInvestmentID }, employeeInvestment);
        }

        // DELETE: api/EmployeeInvestments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeInvestment(int id)
        {
            var employeeInvestment = await _context.EmployeesInvestments.FindAsync(id);
            if (employeeInvestment == null)
            {
                return NotFound();
            }

            _context.EmployeesInvestments.Remove(employeeInvestment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeInvestmentExists(int id)
        {
            return _context.EmployeesInvestments.Any(e => e.EmployeeInvestmentID == id);
        }

        //hr approval
        [HttpGet("PendingApprovals")]
        public async Task<ActionResult<IEnumerable<EmployeeInvestment>>> GetPendingEnrollments()
        {
            var pendingEnrollments = await _context.EmployeesInvestments.Where(e => e.StatusID == 2).ToListAsync();

            return pendingEnrollments;
        }

        //when hr approves or declines employee enrollment
        [HttpPut("PendingApprovals/{id}")]
        public async Task<IActionResult> ApproveEnrollment(int id, [FromBody] string action)
        {
            var enrollment = await _context.EmployeesInvestments.FindAsync(id);

            if (enrollment == null)
            {
                return NotFound();
            }

            if (action.Equals("approve", StringComparison.OrdinalIgnoreCase))
            {
                enrollment.StatusID = 1;
                enrollment.StartDate = DateTime.Now;

                //calculating EndDate
                if (enrollment.Duration.HasValue)
                {
                    enrollment.EndDate = enrollment.StartDate?.AddYears(enrollment.Duration.Value);

                }
            }
            else if (action.Equals("decline", StringComparison.OrdinalIgnoreCase))
            {
                enrollment.StatusID = 3;
            }
            else
            {
                return BadRequest("Invalid action. Please provide 'approve' or 'decline'.");
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
