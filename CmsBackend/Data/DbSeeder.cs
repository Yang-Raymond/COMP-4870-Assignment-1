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
                    Title = "Welcome to your new CMS!",
                    ContentHtml = """
                        <p>Welcome to <strong>Mini-CMS</strong>! This application is designed to be a lightweight, yet powerful content management system for managing your articles and blog posts.</p>
                        <p>With Mini-CMS, you can:</p>
                        <ul>
                            <li>Create and edit articles with a rich text editor.</li>
                            <li>Manage multiple authors with different roles (Admin and Writer).</li>
                            <li>Publish content to a public-facing frontend.</li>
                        </ul>
                        <p>This is a seeded article meant to get you started. Feel free to explore the admin dashboard to see how everything works!</p>
                    """,
                    AuthorId = admin.Id
                },
                new Article
                {
                    Title = "Administrator Guidelines & Best Practices",
                    ContentHtml = """
                        <p>As an administrator, you have the responsibility of managing both content and users. Here are some guidelines to ensure the CMS remains organized and secure:</p>
                        <h3>User Management</h3>
                        <p>Only grant 'Admin' privileges to trusted individuals who need to manage system-wide settings. Most contributors should be assigned the 'Writer' role.</p>
                        <h3>Content Review</h3>
                        <p>Before publishing articles, ensure they meet the quality standards of your organization. Check for formatting consistency and accurate information.</p>
                        <h3>Security Reminders</h3>
                        <p>Never share your password and ensure that all users follow basic security protocols.</p>
                    """,
                    AuthorId = admin.Id
                },
                new Article
                {
                    Title = "Top 5 Tips for Successful Writing",
                    ContentHtml = """
                        <p>Writing for the web requires a different approach than traditional print. Here are five tips to help you craft effective and engaging articles:</p>
                        <ol>
                            <li><strong>Know Your Audience:</strong> Write in a tone that resonates with your readers.</li>
                            <li><strong>Use Clear Headings:</strong> Break up long text with descriptive H2 and H3 tags.</li>
                            <li><strong>Keep Paragraphs Short:</strong> Large blocks of text can be intimidating on a screen.</li>
                            <li><strong>Add Value:</strong> Ensure every article provides useful information or a unique perspective.</li>
                            <li><strong>Proofread:</strong> Always check for typos and grammatical errors before hitting publish.</li>
                        </ol>
                        <p>Happy writing!</p>
                    """,
                    AuthorId = writer1.Id
                },
                new Article
                {
                    Title = "CMS Feature Update: March 2026",
                    ContentHtml = """
                        <p>We are excited to announce several new features and improvements to the Mini-CMS platform this month!</p>
                        <ul>
                            <li><strong>Enhanced Search:</strong> Finding articles is now faster and more accurate.</li>
                            <li><strong>Mobile Optimization:</strong> The public frontend now looks even better on smartphones and tablets.</li>
                            <li><strong>Dark Mode Support:</strong> A brand new dark theme for the admin dashboard.</li>
                        </ul>
                        <p>We are constantly working to improve your experience. If you have any feedback, please let us know through the contact form.</p>
                    """,
                    AuthorId = writer1.Id
                },
                new Article
                {
                    Title = "Getting Started: A Guide for New Writers",
                    ContentHtml = """
                        <p>New to the team? This guide will help you get up to speed with our publishing workflow.</p>
                        <p>First, log in to your account using the credentials provided by your administrator. Once logged in, you'll see a 'Create New Article' button on your dashboard.</p>
                        <p>When drafting your content, remember to use proper HTML tags for formatting. Our system supports:</p>
                        <ul>
                            <li><code>&lt;p&gt;</code> for paragraphs</li>
                            <li><code>&lt;strong&gt;</code> and <code>&lt;em&gt;</code> for emphasis</li>
                            <li><code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code> for lists</li>
                        </ul>
                        <p>Don't forget to save your work frequently!</p>
                    """,
                    AuthorId = writer2.Id
                },
                new Article
                {
                    Title = "How to Contact Technical Support",
                    ContentHtml = """
                        <p>Experiencing technical issues? Our support team is here to help you solve any problems you might encounter.</p>
                        <p>You can reach us through the following channels:</p>
                        <ul>
                            <li><strong>Email:</strong> support@minicms.example.com</li>
                            <li><strong>Help Desk:</strong> Submit a ticket through the internal portal.</li>
                            <li><strong>Community Forum:</strong> Check for common solutions in our active user community.</li>
                        </ul>
                        <p>When reporting an issue, please include a detailed description and any relevant error messages to help us diagnose the problem more quickly.</p>
                    """,
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