using Microsoft.EntityFrameworkCore;
using webApi.Models;

namespace webApi.Data;

public class ProductsListContext : DbContext
{
  public DbSet<CategoryModel> Categories { get; set; }
  public DbSet<ProductModel> Products { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite(connectionString: "Data source=products-list.sqlite");
    base.OnConfiguring(optionsBuilder);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<ProductModel>()
        .HasOne(p => p.Category)
        .WithMany(c => c.Products)
        .HasForeignKey(p => p.CategoryId)
        .OnDelete(DeleteBehavior.Cascade);
  }

}