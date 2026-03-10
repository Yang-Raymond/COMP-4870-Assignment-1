using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CmsBackend.Models;

public class Article
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    [Display(Name = "Title")]
    public string Title { get; set; } = "";

    [Required]
    [Display(Name = "Article Content")]
    public string ContentHtml { get; set; } = "";

    [Required]
    [Display(Name = "Author")]
    public string AuthorId { get; set; } = "";

    [ForeignKey("AuthorId")]
    public virtual IdentityUser? Author { get; set; }

    [Display(Name = "Created Date (UTC)")]
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    [Display(Name = "Last Updated (UTC)")]
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}