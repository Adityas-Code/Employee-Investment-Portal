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
    public class InvestmentPlansController : ControllerBase
    {
        private readonly AppDBContext _context;

        public InvestmentPlansController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/InvestmentPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvestmentPlan>>> GetInvestmentPlans()
        {
            return await _context.InvestmentPlans.ToListAsync();
        }

        // GET: api/InvestmentPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvestmentPlan>> GetInvestmentPlan(int id)
        {
            var investmentPlan = await _context.InvestmentPlans.FindAsync(id);

            if (investmentPlan == null)
            {
                return NotFound();
            }

            return investmentPlan;
        }

        // PUT: api/InvestmentPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvestmentPlan(int id, InvestmentPlan investmentPlan)
        {
            if (id != investmentPlan.PlanID)
            {
                return BadRequest();
            }

            _context.Entry(investmentPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvestmentPlanExists(id))
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

        // POST: api/InvestmentPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvestmentPlan>> PostInvestmentPlan(InvestmentPlan investmentPlan)
        {
            _context.InvestmentPlans.Add(investmentPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvestmentPlan", new { id = investmentPlan.PlanID }, investmentPlan);
        }

        // DELETE: api/InvestmentPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvestmentPlan(int id)
        {
            var investmentPlan = await _context.InvestmentPlans.FindAsync(id);
            if (investmentPlan == null)
            {
                return NotFound();
            }

            _context.InvestmentPlans.Remove(investmentPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvestmentPlanExists(int id)
        {
            return _context.InvestmentPlans.Any(e => e.PlanID == id);
        }
    }
}
