using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;
using webApi.Data;
using webApi.Models;

namespace webApi.Routes;

public static class CategoryRoute
{
  public static void ConfigureCategoryRoutes(this WebApplication app)
  {
    var route = app.MapGroup("category");

    route.MapPost("", async (CategoryRequest req, ProductsListContext context) =>
    {
      var category = new CategoryModel();
      category.Name = req.name;

      await context.AddAsync(category);
      await context.SaveChangesAsync();
    });

    route.MapGet("", async (ProductsListContext context) =>
    {
      var categories = await context.Categories
        .Include(c => c.Products)
        .Select(c => new
        {
          c.Id,
          c.Name,
          Products = c.Products.Select(p => new
          {
            p.Id,
            p.Name,
            p.Price,
            p.Image,
            p.CategoryId
          }).ToList()
        })
        .ToListAsync();

      return Results.Ok(categories);
    });

    route.MapPut("{id:guid}", async (Guid id, CategoryRequest req, ProductsListContext context) =>
   {
     var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);
     if (category == null)
     {
       return Results.NotFound();
     }

     category.Name = req.name;
     await context.SaveChangesAsync();
     return Results.Ok(category);
   });

    route.MapDelete("{id:guid}", async (Guid id, ProductsListContext context) =>
   {
     var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);

     if (category == null)
     {
       return Results.NotFound();
     }

     context.Categories.Remove(category);
     await context.SaveChangesAsync();
     return Results.Ok(category);
   });
  }
}
