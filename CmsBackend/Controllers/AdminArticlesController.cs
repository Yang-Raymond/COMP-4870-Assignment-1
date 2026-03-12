using System.Security.Claims;
using CmsBackend.Data;
using CmsBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmsBackend.Controllers;

[Authorize]
[Route("Articles")]
public class AdminArticlesController : Controller
{
    private readonly ApplicationDbContext _db;

    public AdminArticlesController(ApplicationDbContext db) => _db = db;

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> Index()
    {
        if (User.IsInRole("admin"))
        {
            var articles = await _db.Articles
                .Include(a => a.Author)
                .OrderByDescending(a => a.CreatedAtUtc)
                .ToListAsync();

            return View(articles);
        }
        else if (User.IsInRole("writer"))
        {
            var articles = await _db.Articles
                .Where(a => a.AuthorId == User.FindFirstValue(ClaimTypes.NameIdentifier))
                .Include(a => a.Author)
                .OrderByDescending(a => a.CreatedAtUtc)
                .ToListAsync();

            return View(articles);
        }
        else
        {
            return Forbid();
        }
    }

    [HttpGet]
    [Route("Create")]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [Route("Create")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Article article)
    {
        // 1. Manually assign the AuthorId FIRST
        article.AuthorId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

        // 2. Clear the validation errors for fields we manage automatically
        ModelState.Remove(nameof(article.AuthorId));
        ModelState.Remove(nameof(article.Author));

        // 3. NOW check if the rest of the form (Title, Content) is valid
        if (!ModelState.IsValid)
            return View(article);

        article.Id = 0;
        article.CreatedAtUtc = DateTime.UtcNow;
        article.UpdatedAtUtc = DateTime.UtcNow;

        _db.Articles.Add(article);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    [Route("Edit/{id:int}")]
    public async Task<IActionResult> Edit(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null)
            return NotFound();

        if (User.IsInRole("writer"))
        {
            if (article.AuthorId != User.FindFirstValue(ClaimTypes.NameIdentifier))
                return Forbid();
        }
        return View(article);
    }

    [HttpPost]
    [Route("Edit/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Article article)
    {
        if (id != article.Id)
            return BadRequest();

        if (User.IsInRole("writer"))
        {
            if (article.AuthorId != User.FindFirstValue(ClaimTypes.NameIdentifier))
                return Forbid();
        }

        if (!ModelState.IsValid)
            return View(article);

        var existing = await _db.Articles.FindAsync(id);
        if (existing is null)
            return NotFound();

        existing.Title = article.Title;
        existing.ContentHtml = article.ContentHtml;
        existing.UpdatedAtUtc = DateTime.UtcNow;
        existing.AuthorId = article.AuthorId;

        _db.Articles.Update(existing);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [Route("Delete/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var article = await _db.Articles.FindAsync(id);
        if (article is null)
            return NotFound();

        if (User.IsInRole("writer"))
        {
            if (article.AuthorId != User.FindFirstValue(ClaimTypes.NameIdentifier))
                return Forbid();
        }

        _db.Articles.Remove(article);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }
}