using CmsBackend.Data;
using CmsBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmsBackend.Controllers;

[Authorize]
[Route("admin")]
public class AdminArticlesController : Controller
{
    private readonly ApplicationDbContext _db;

    public AdminArticlesController(ApplicationDbContext db) => _db = db;

    // GET: admin/ - List all articles
    [HttpGet("")]
    [HttpGet("articles")]
    public async Task<IActionResult> Index()
    {
        var articles = await _db.Articles.OrderByDescending(a => a.CreatedAtUtc).ToListAsync();
        return View(articles);
    }

    // GET: admin/create - Show create form
    [HttpGet("create")]
    public IActionResult Create()
    {
        return View();
    }

    // POST: admin/create - Create new article
    [HttpPost("create")]
    public async Task<IActionResult> Create(Article article)
    {
        if (!ModelState.IsValid)
            return View(article);

        article.Id = 0;
        article.CreatedAtUtc = DateTime.UtcNow;
        article.UpdatedAtUtc = DateTime.UtcNow;
        article.AuthorName = User.Identity?.Name ?? "Unknown";

        _db.Articles.Add(article);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    // GET: admin/edit/{id} - Show edit form
    [HttpGet("edit/{id:int}")]
    public async Task<IActionResult> Edit(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null)
            return NotFound();

        return View(article);
    }

    // POST: admin/edit/{id} - Update article
    [HttpPost("edit/{id:int}")]
    public async Task<IActionResult> Edit(int id, Article article)
    {
        if (id != article.Id)
            return BadRequest();

        if (!ModelState.IsValid)
            return View(article);

        var existing = await _db.Articles.FindAsync(id);
        if (existing is null)
            return NotFound();

        existing.Title = article.Title;
        existing.ContentHtml = article.ContentHtml;
        existing.UpdatedAtUtc = DateTime.UtcNow;

        _db.Articles.Update(existing);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    // POST: admin/delete/{id} - Delete article
    [HttpPost("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null)
            return NotFound();

        _db.Articles.Remove(article);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }
}
