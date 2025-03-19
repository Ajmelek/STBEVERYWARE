using Microsoft.AspNetCore.Mvc;
using KYCForm.Models;
using System.Threading.Tasks;
using STBEveryware.Data;

namespace KYCForm.Controllers
{
  public class KYCFormController : Controller
  {
    private readonly ApplicationDbContext _context;

    public KYCFormController(ApplicationDbContext context)
    {
      _context = context;
    }

    // GET: KYCForm
    public async Task<IActionResult> Index()
    {
      return View(await _context.KYCForms.ToListAsync());
    }

    // GET: KYCForm/Create
    public IActionResult Create()
    {
      return View();
    }

    // POST: KYCForm/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(KYCFormModel kycForm)
    {
      if (ModelState.IsValid)
      {
        _context.Add(kycForm);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
      }
      return View(kycForm);
    }

    // GET: KYCForm/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
      if (id == null)
      {
        return NotFound();
      }

      var kycForm = await _context.KYCForms.FindAsync(id);
      if (kycForm == null)
      {
        return NotFound();
      }
      return View(kycForm);
    }

    // POST: KYCForm/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, KYCFormModel kycForm)
    {
      if (id != kycForm.Id)
      {
        return NotFound();
      }

      if (ModelState.IsValid)
      {
        _context.Update(kycForm);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
      }
      return View(kycForm);
    }

    // GET: KYCForm/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
      if (id == null)
      {
        return NotFound();
      }

      var kycForm = await _context.KYCForms
          .FirstOrDefaultAsync(m => m.Id == id);
      if (kycForm == null)
      {
        return NotFound();
      }

      return View(kycForm);
    }

    // POST: KYCForm/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
      var kycForm = await _context.KYCForms.FindAsync(id);
      _context.KYCForms.Remove(kycForm);
      await _context.SaveChangesAsync();
      return RedirectToAction(nameof(Index));
    }
  }
}
