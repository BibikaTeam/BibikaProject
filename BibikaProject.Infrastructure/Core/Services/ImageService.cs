using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class ImageService : IImageService
    {
        public ImageService(UserManager<ApplicationUser> userManager, IImageCommand command)
        {
            this.userManager = userManager;
            this.command = command;
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly IImageCommand command;

        public const string ImagesPath = "images/";

        public Task DeleteImage(int id, string userId)
        {
            throw new NotImplementedException();
        }

        public async Task SaveImage(string base64, string userId)
        {          
            string imageTitle = $"{userId}_{ Guid.NewGuid()}";

            if(!Directory.Exists(ImagesPath))
            {
                Directory.CreateDirectory(ImagesPath);
            }    

            var bytes = Convert.FromBase64String(base64);
            using (var imageFile = new FileStream($"{ImagesPath}/{imageTitle}.png", FileMode.Create))
            {
                await imageFile.WriteAsync(bytes, 0, bytes.Length);
                await imageFile.FlushAsync();
            }

            await command.AddAsync(new Image { Title = imageTitle, UserId = userId });
            await command.SaveChangesAsync();
        }
    }
}
