using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webApi.Models
{
  public class ProductModel
  {
    [Key]
    public Guid Id { get; init; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public float Price { get; set; }

    public string? Image { get; set; }

    [ForeignKey(nameof(Category))]
    public Guid CategoryId { get; set; }

    public CategoryModel? Category { get; set; }

    public string? CategoryName => Category?.Name;
  }
}
