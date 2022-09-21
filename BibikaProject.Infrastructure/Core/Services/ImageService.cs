using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
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
            
            if (userRoles.Contains("Admin") || image.UserId == userId)
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

            // Source
            using (var imageFile = SixLabors.ImageSharp.Image.Load(bytes))
            {
                imageFile.Save(new FileStream($"{ImagesPath}/{imageTitle}.png", FileMode.Create), new PngEncoder());
            }

            // Medium 
            using (var imageFile = SixLabors.ImageSharp.Image.Load(bytes))
            {
                imageFile.Mutate(x => x.Resize(512, 512));

                imageFile.Save(new FileStream($"{ImagesPath}/{imageTitle}_medium.png", FileMode.Create), new PngEncoder());
            }

            // Small
            using (var imageFile = SixLabors.ImageSharp.Image.Load(bytes))
            {
                imageFile.Mutate(x => x.Resize(128, 128));

                imageFile.Save(new FileStream($"{ImagesPath}/{imageTitle}_small.png", FileMode.Create), new PngEncoder());
            }

            var img = await command.AddAsync(new Image { Title = imageTitle, UserId = userId });
            await command.SaveChangesAsync();

            return img.Id;
        }

        public async Task<string> GetImage(int id)
        {
            var image = await query.GetByIdAsync(id);

            return $"{image.Title}";
        }       

        public async Task<List<string>> GetImagesByPost(int postId)
        {
            var images = query.GetAll().Where(x => x.PostId == postId);

            var result = images.Select(x => $"{x.Title}");

            return await result.ToListAsync();
        }
    }
}
