using CmsBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace CmsBackend.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await db.Database.MigrateAsync();

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        string[] roleNames = { "admin", "writer" };
        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var admin = await EnsureUserAsync(userManager, "a@a.a", "P@$$w0rd", "admin");
        var writer1 = await EnsureUserAsync(userManager, "w@w.w", "P@$$w0rd", "writer");
        var writer2 = await EnsureUserAsync(userManager, "x@x.x", "P@$$w0rd", "writer");
        
        if (!db.Articles.Any())
        {
            db.Articles.AddRange(
                new Article
                {
                    Title = "Welcome to Mini-CMS",
                    ContentHtml = "<p>This is the first seeded article.</p>",
                    AuthorId = admin.Id
                },
                new Article
                {
                    Title = "Admin Guidelines",
                    ContentHtml = "<p>Rules for managing the CMS.</p>",
                    AuthorId = admin.Id
                },
                new Article
                {
                    Title = "Writer Tips",
                    ContentHtml = "<p>How to format your articles effectively.</p>",
                    AuthorId = writer1.Id
                },
                new Article
                {
                    Title = "News Update",
                    ContentHtml = "<p>Latest news from the team.</p>",
                    AuthorId = writer1.Id
                },
                new Article
                {
                    Title = "Getting Started",
                    ContentHtml = "<p>A quick start guide for new users.</p>",
                    AuthorId = writer2.Id
                },
                new Article
                {
                    Title = "Contact Us",
                    ContentHtml = "<p>Reach out to us for support.</p>",
                    AuthorId = writer2.Id
                }
            );
            await db.SaveChangesAsync();
        }
    }

    private static async Task<IdentityUser> EnsureUserAsync(UserManager<IdentityUser> userManager, string email, string password, string role)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new IdentityUser 
            { 
                UserName = email, 
                Email = email, 
                EmailConfirmed = true 
            };
            await userManager.CreateAsync(user, password);
            await userManager.AddToRoleAsync(user, role);
        }
        return user;
    }
}