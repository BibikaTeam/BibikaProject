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

            var medium = Convert.FromBase64String(ResizeImage(bytes, 512, 512)); 
            using (var imageFile = new FileStream($"{ImagesPath}/{imageTitle}_medium.png", FileMode.Create))
            {
                await imageFile.WriteAsync(medium, 0, medium.Length);
                await imageFile.FlushAsync();
            }

            var small = Convert.FromBase64String(ResizeImage(bytes, 128, 128));
            using (var imageFile = new FileStream($"{ImagesPath}/{imageTitle}_small.png", FileMode.Create))
            {
                await imageFile.WriteAsync(small, 0, small.Length);
                await imageFile.FlushAsync();
            }

            var img = await command.AddAsync(new Image { Title = imageTitle, UserId = userId });
            await command.SaveChangesAsync();

            return img.Id;
        }

        public async Task<string> GetImage(int id)
        {
            var image = await query.GetByIdAsync(id);

            return $"{ImagesPath}/{ image.Title}.png";
        }

        private string ResizeImage(byte[] data, int w, int h)
        {
            using (var ms = new MemoryStream(data))
            {
                var image = System.Drawing.Image.FromStream(ms);

                var ratioX = (double)w / image.Width;
                var ratioY = (double)h / image.Height;

                var ratio = Math.Min(ratioX, ratioY);

                var width = (int)(image.Width * ratio);
                var height = (int)(image.Height * ratio);

                var newImage = new System.Drawing.Bitmap(width, height);

                System.Drawing.Graphics.FromImage(newImage).DrawImage(image, 0, 0, width, height);

                System.Drawing.Bitmap bmp = new System.Drawing.Bitmap(newImage);

                System.Drawing.ImageConverter converter = new System.Drawing.ImageConverter();

                data = (byte[])converter.ConvertTo(bmp, typeof(byte[]));

                return Convert.ToBase64String(data);
            }
        }
    }
}
