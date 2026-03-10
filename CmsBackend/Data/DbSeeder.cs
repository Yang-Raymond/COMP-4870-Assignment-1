using CmsBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace CmsBackend.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

        var adminUserName = "admin";
        var adminEmail = "a@a.a";
        var adminPassword = "P@$$w0rd";

        var admin = await userManager.FindByEmailAsync(adminEmail);
        if (admin == null)
        {
            admin = new IdentityUser
            {
                UserName = adminUserName,
                Email = adminEmail,
                EmailConfirmed = true,
            };
            await userManager.CreateAsync(admin, adminPassword);
        }

        if (!db.Articles.Any())
        {
            db.Articles.AddRange(
                new Article
                {
                    Title = "Welcome",
                    ContentHtml = "<p>Seeded article 1.</p>",
                    AuthorId = admin.Id,
                },
                new Article
                {
                    Title = "About",
                    ContentHtml = "<p>Seeded article 2.</p>",
                    AuthorId = admin.Id,
                },
                new Article
                {
                    Title = "FAQ",
                    ContentHtml = "<p>Seeded article 3.</p>",
                    AuthorId = admin.Id,
                },
                new Article
                {
                    Title = "News",
                    ContentHtml = "<p>Seeded article 4.</p>",
                    AuthorId = admin.Id,
                },
                new Article
                {
                    Title = "Getting Started",
                    ContentHtml = "<p>Seeded article 5.</p>",
                    AuthorId = admin.Id,
                },
                new Article
                {
                    Title = "Contact",
                    ContentHtml = "<p>Seeded article 6.</p>",
                    AuthorId = admin.Id,
                }
            );
            await db.SaveChangesAsync();
        }
    }
}