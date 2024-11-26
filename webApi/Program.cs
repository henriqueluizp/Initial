using webApi.Data;
using webApi.Routes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ProductsListContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigureProductRoutes();
app.ConfigureCategoryRoutes();
app.UseHttpsRedirection();
app.Run();
