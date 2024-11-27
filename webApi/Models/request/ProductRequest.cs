using Azure.Core;

namespace webApi.Models;

public record ProductRequest(string name, string? image, float price, Guid CategoryId);