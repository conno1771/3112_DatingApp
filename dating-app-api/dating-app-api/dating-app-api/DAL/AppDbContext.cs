using System.Collections.Generic;
using dating_app_api.DAL.DomainClasses;
using Microsoft.EntityFrameworkCore;

namespace dating_app_api.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public virtual DbSet<User>? Users { get; set; }
    }
}
