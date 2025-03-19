using Microsoft.EntityFrameworkCore;
using KYCFormAPI.Models;
using System.Collections.Generic;

namespace KYCFormAPI.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
    {
    }

    public DbSet<KYCFormModel> KYCForms { get; set; }
  }
}
