using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services.Helpers
{
    public class AdvertismentHelper
    {
        public AdvertismentHelper(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        private readonly IServiceProvider serviceProvider;

        public async Task DecrementDailyPoints()
        {
            var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();


            foreach (var item in context.Posts)
            {
                if (item.DailyPoint != 0)
                {
                    item.DailyPoint -= 1;
                }
            }

            await context.SaveChangesAsync();
        }

        public async Task DecrementBalance()
        {
            var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();


            foreach (var item in context.Posts)
            {
                if (item.Balance >= 3)
                {
                    item.Balance -= 3;
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
