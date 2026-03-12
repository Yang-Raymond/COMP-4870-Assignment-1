using CmsBackend.Data;
using CmsBackend.Models;
using Ganss.Xss;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmsBackend.Controllers;

[ApiController]
[Route("api/articles")]
public class ArticlesApiController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly HtmlSanitizer _sanitizer = new HtmlSanitizer();

    public ArticlesApiController(ApplicationDbContext db, UserManager<IdentityUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<List<Article>> GetAll()
        => await _db.Articles.OrderByDescending(a => a.CreatedAtUtc).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Article>> GetById(int id)
    {
        var a = await _db.Articles.FindAsync(id);
        return a is null ? NotFound() : Ok(a);
    }
}