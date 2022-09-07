using BibikaProject.Domain.Entities.Chat;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BibikaProject.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        public virtual DbSet<Brand> Brands { get; set; }

        public virtual DbSet<Car> Cars { get; set; }

        public virtual DbSet<CarBody> CarBodies { get; set; }

        public virtual DbSet<CompleteSet> CompleteSets { get; set; }

        public virtual DbSet<Engine> Engines { get; set; }

        public virtual DbSet<GearBox> GearBoxes { get; set; }

        public virtual DbSet<Generation> Generations { get; set; }

        public virtual DbSet<Image> Images { get; set; }

        public virtual DbSet<Model> Models { get; set; }

        public virtual DbSet<Option> Options { get; set; }

        public virtual DbSet<Post> Posts { get; set; }

        public virtual DbSet<Message> Messages { get; set; }

        public virtual DbSet<Domain.Entities.Chat.Chat> Chats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Post>()
                   .HasMany(x => x.Likes)
                   .WithMany(x => x.LikedPosts);

            builder.Entity<Post>()
                   .HasMany(x => x.Views)
                   .WithMany(x => x.ViewedPosts);

            builder.Entity<Post>()
                   .HasOne(x => x.Seller)
                   .WithMany(x => x.Posts);          

            //builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
