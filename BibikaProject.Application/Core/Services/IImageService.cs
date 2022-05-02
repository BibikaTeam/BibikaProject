using System.Drawing;
using static System.Net.Mime.MediaTypeNames;

namespace BibikaProject.Application.Core.Services
{
    public interface IImageService
    {
        public System.Drawing.Image GetImageFromBase64(string base64);
        public Bitmap GetSizedBitmap(System.Drawing.Image originalImage, int width);
        public void SaveImage(Bitmap bitmap, string filename);
    }
}
