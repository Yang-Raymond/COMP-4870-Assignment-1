using CMSProject.Models;
using Microsoft.AspNetCore.Identity;

namespace CMSProject.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

        var adminEmail = "a@a.a";
        var adminPassword = "P@$$w0rd";

        var admin = await userManager.FindByEmailAsync(adminEmail);
        if (admin == null)
        {
            admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            await userManager.CreateAsync(admin, adminPassword);
        }

        if (!db.Articles.Any())
        {
            db.Articles.AddRange(
                new Article { Title = "Welcome", ContentHtml = "<p>Seeded article 1.</p>", AuthorName="admin" },
                new Article { Title = "About", ContentHtml = "<p>Seeded article 2.</p>", AuthorName="admin" },
                new Article { Title = "FAQ", ContentHtml = "<p>Seeded article 3.</p>", AuthorName="admin" },
                new Article { Title = "News", ContentHtml = "<p>Seeded article 4.</p>", AuthorName="admin" },
                new Article { Title = "Getting Started", ContentHtml = "<p>Seeded article 5.</p>", AuthorName="admin" },
                new Article { Title = "Contact", ContentHtml = "<p>Seeded article 6.</p>", AuthorName="admin" }
            );
            await db.SaveChangesAsync();
        }
    }
}
