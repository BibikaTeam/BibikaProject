using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.Queries;
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
        public ImageService(UserManager<ApplicationUser> userManager, IImageCommand command, IImageQuery query)
        {
            this.userManager = userManager;
            this.command = command;
            this.query = query;
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly IImageCommand command;
        private readonly IImageQuery query;

        public const string ImagesPath = "images/";

        public async Task DeleteImage(int id, string userId)
        {
            var userRoles = await userManager.GetRolesAsync(await userManager.FindByIdAsync(userId));
            var image = await query.GetByIdAsync(id);
            
            if (userRoles.Contains("Administrator") || image.UserId == userId)
            {
                File.Delete($"{ImagesPath}/{image.Title}.png");

                command.Delete(id);
                await command.SaveChangesAsync();
            }      
        }

        public async Task<int> SaveImage(string base64, string userId)
        {          
            string imageTitle = $"{userId}_{ Guid.NewGuid()}";

            if (!Directory.Exists(ImagesPath))
            {
                Directory.CreateDirectory(ImagesPath);
            }    

            var bytes = Convert.FromBase64String(base64);
            using (var imageFile = new FileStream($"{ImagesPath}/{imageTitle}.png", FileMode.Create))
            {
                await imageFile.WriteAsync(bytes, 0, bytes.Length);
                await imageFile.FlushAsync();
            }

            var img = await command.AddAsync(new Image { Title = imageTitle, UserId = userId });
            await command.SaveChangesAsync();

            return img.Id;
        }

        public async Task<byte[]> GetImage(int id)
        {
            var image = await query.GetByIdAsync(id);

            var byteImage = await File.ReadAllBytesAsync($"{ImagesPath}/{image.Title}.png");

            return byteImage;
        }
    }
}
