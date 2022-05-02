using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.Services;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Windows.Input;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageCommand imageCommand;
        public ImageService(IImageCommand imageCommand)
        {
            this.imageCommand = imageCommand;
        }
        public void SaveImages(List<string> base64Array)
        {

        }
        public Image GetImageFromBase64(string base64)
        {
            byte[] bytes = Convert.FromBase64String(base64);

            Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = Image.FromStream(ms);
            }

            return image;
        }
        public Bitmap GetSizedBitmap(Image originalImage, int width)
        {
            double aspectRatio = originalImage.Width / originalImage.Height;

            var destRect = new Rectangle(0, 0, width, (int)(width / aspectRatio));
            var destImage = new Bitmap(width, (int)(width / aspectRatio));

            destImage.SetResolution(originalImage.HorizontalResolution, originalImage.VerticalResolution);
            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(originalImage, destRect, 0, 0, originalImage.Width, originalImage.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }
        public void SaveImage(Bitmap bitmap, string filename)
        {
            bitmap.Save("/images/posts" + filename + ".jpg");
        }
    }
}
