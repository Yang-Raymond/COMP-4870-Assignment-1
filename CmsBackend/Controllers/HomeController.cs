using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CmsBackend.Models;

namespace CmsBackend.Controllers;

// Handles home page and error views.
public class HomeController : Controller
{
    // Display the home page.
    public IActionResult Index()
    {
        return View();
    }

    // Display the privacy policy page.
    public IActionResult Privacy()
    {
        return View();
    }

    // Display error page with request tracking information.
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
