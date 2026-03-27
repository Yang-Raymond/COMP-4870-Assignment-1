using CmsBackend.Data;
using CmsBackend.Models;
using Ganss.Xss;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmsBackend.Controllers;

/*
    This controller handles the API endpoints for public blazor frontend.
*/
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

    public sealed class ArticleResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ContentHtml { get; set; } = string.Empty;
        public string AuthorId { get; set; } = string.Empty;
        public string? AuthorName { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public DateTime UpdatedAtUtc { get; set; }
    }

    /*
        Gets all articles
    */
    [HttpGet]
    public async Task<List<ArticleResponse>> GetAll()
        => await _db.Articles
            .Include(a => a.Author)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new ArticleResponse
            {
                Id = a.Id,
                Title = a.Title,
                ContentHtml = a.ContentHtml,
                AuthorId = a.AuthorId,
                AuthorName = a.Author != null ? a.Author.UserName : null,
                CreatedAtUtc = a.CreatedAtUtc,
                UpdatedAtUtc = a.UpdatedAtUtc
            })
            .ToListAsync();

    /*
        Gets a specific article by ID
    */
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ArticleResponse>> GetById(int id)
    {
        var article = await _db.Articles
            .Include(a => a.Author)
            .Where(a => a.Id == id)
            .Select(a => new ArticleResponse
            {
                Id = a.Id,
                Title = a.Title,
                ContentHtml = a.ContentHtml,
                AuthorId = a.AuthorId,
                AuthorName = a.Author != null ? a.Author.UserName : null,
                CreatedAtUtc = a.CreatedAtUtc,
                UpdatedAtUtc = a.UpdatedAtUtc
            })
            .FirstOrDefaultAsync();

        return article is null ? NotFound() : Ok(article);
    }
}