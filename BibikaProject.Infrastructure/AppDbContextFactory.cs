using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseNpgsql("Server=91.238.103.51;Port=5743;Database=dbnobibika;User Id=userbibika;Password=$54d80086Gh89009s22EEdw^^&***Kjhh3@@(###G)K$t!Ube22}xk");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
