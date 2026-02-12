using System.ComponentModel.DataAnnotations;

namespace CmsBackend.Models;

public class SignUp
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}
