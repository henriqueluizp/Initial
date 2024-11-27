using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;
using webApi.Data;
using webApi.Models;

namespace webApi.Routes;

public static class ProductRoutes
{
  public static void ConfigureProductRoutes(this WebApplication app)
  {
    var route = app.MapGroup("products");

    route.MapPost("", async (ProductRequest req, ProductsListContext context) =>
    {
      var product = new ProductModel
      {
        Name = req.name,
        Image = req.image,
        Price = req.price,
        CategoryId = req.CategoryId
      };

      var category = await context.Categories.FindAsync(product.CategoryId);
      product.Category = category;

      await context.AddAsync(product);
      await context.SaveChangesAsync();
    });

    route.MapGet("", async (ProductsListContext context) =>
    {
      var products = await context.Products.ToListAsync();
      return Results.Ok(products);
    });

    route.MapPut("{id:guid}", async (Guid id, ProductRequest req, ProductsListContext context) =>
    {
      var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
      if (product == null) return Results.NotFound();

      product.Name = req.name;
      product.Image = req.image;
      product.Price = req.price;
      product.CategoryId = req.CategoryId;

      await context.SaveChangesAsync();
      return Results.Ok(product);
    });

    route.MapDelete("{id:guid}", async (Guid id, ProductsListContext context) =>
   {
     var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
     if (product == null)
     {
       return Results.NotFound();
     }

     context.Products.Remove(product);
     await context.SaveChangesAsync();
     return Results.Ok(product);
   });
  }
}
