using System.ComponentModel.DataAnnotations;

namespace webApi.Models
{
  public class CategoryModel
  {
    [Key]
    public Guid Id { get; init; }

    [Required]
    public string Name { get; set; } = string.Empty;

    // Relacionamento com produtos
    public ICollection<ProductModel> Products { get; set; } = new List<ProductModel>();
  }
}
