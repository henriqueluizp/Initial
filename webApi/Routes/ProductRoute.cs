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
      var product = new ProductModel();
      product.Name = req.name;
      product.Image = req.image;
      product.Price = req.price;
      product.CategoryId = req.CategoryId;

      var category = await context.Category.FindAsync(product.CategoryId);
      product.Category = category;

      await context.AddAsync(product);
      await context.SaveChangesAsync();
    });

    route.MapGet("", async (ProductsListContext context) =>
    {
      var products = await context.Product.ToListAsync();
      return Results.Ok(products);
    });

    route.MapPut("{id:guid}", async (Guid id, ProductRequest req, ProductsListContext context) =>
   {
     var product = await context.Product.FirstOrDefaultAsync(x => x.Id == id);
     if (product == null)
     {
       return Results.NotFound();
     }

     product.Name = req.name;
     await context.SaveChangesAsync();
     return Results.Ok(product);
   });

    route.MapDelete("{id:guid}", async (Guid id, ProductsListContext context) =>
   {
     var product = await context.Product.FirstOrDefaultAsync(x => x.Id == id);
     if (product == null)
     {
       return Results.NotFound();
     }

     context.Product.Remove(product);
     await context.SaveChangesAsync();
     return Results.Ok(product);
   });
  }
}