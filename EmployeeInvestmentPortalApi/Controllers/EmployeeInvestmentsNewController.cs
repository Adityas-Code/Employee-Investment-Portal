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
    public class EmployeeInvestmentsNewController : ControllerBase
    {
        private readonly AppDBContext _context;

        public EmployeeInvestmentsNewController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeInvestmentsNew
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeInvestment>>> GetEmployeesInvestments()
        {
            return await _context.EmployeesInvestments.ToListAsync();
        }

        // GET: api/EmployeeInvestmentsNew/5
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

        // PUT: api/EmployeeInvestmentsNew/5
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

        // POST: api/EmployeeInvestmentsNew
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeInvestment>> PostEmployeeInvestment(EmployeeInvestment employeeInvestment)
        {
            _context.EmployeesInvestments.Add(employeeInvestment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeInvestment", new { id = employeeInvestment.EmployeeInvestmentID }, employeeInvestment);
        }

        // DELETE: api/EmployeeInvestmentsNew/5
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
    }
}
