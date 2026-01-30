using CMSProject.Data;
using CMSProject.Models;
using Ganss.Xss;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMSProject.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesApiController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly HtmlSanitizer _sanitizer = new HtmlSanitizer();

    public ArticlesApiController(ApplicationDbContext db) => _db = db;

    [HttpGet]
    public async Task<List<Article>> GetAll()
        => await _db.Articles.OrderByDescending(a => a.CreatedAtUtc).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Article>> GetById(int id)
    {
        var a = await _db.Articles.FindAsync(id);
        return a is null ? NotFound() : Ok(a);
    }

    [HttpPost]
    public async Task<ActionResult<Article>> Create([FromBody] Article input)
    {
        input.Id = 0;
        input.ContentHtml = _sanitizer.Sanitize(input.ContentHtml);
        input.CreatedAtUtc = DateTime.UtcNow;
        input.UpdatedAtUtc = DateTime.UtcNow;

        _db.Articles.Add(input);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Article input)
    {
        var a = await _db.Articles.FindAsync(id);
        if (a is null) return NotFound();

        a.Title = input.Title;
        a.ContentHtml = _sanitizer.Sanitize(input.ContentHtml);
        a.AuthorName = input.AuthorName;
        a.UpdatedAtUtc = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var a = await _db.Articles.FindAsync(id);
        if (a is null) return NotFound();

        _db.Articles.Remove(a);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
