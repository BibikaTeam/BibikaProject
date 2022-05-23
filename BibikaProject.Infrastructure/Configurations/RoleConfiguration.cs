using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BibikaProject.Infrastructure.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData
            (
                new IdentityRole
                {
                    Id = "f71c39da-6d24-4a26-b34b-be2d2d508fa9",
                    ConcurrencyStamp = "874a171b-47e2-4bc9-accd-10c9deba09ae",
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole
                {
                    Id = "4ef2e6af-0110-4e25-a358-b3170155d752",
                    ConcurrencyStamp = "e62cf1b9-6858-4ec8-9f07-f766d619b6dd",
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                }
            );
        }
    }
}
