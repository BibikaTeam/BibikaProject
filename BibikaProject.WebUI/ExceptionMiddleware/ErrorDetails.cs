using System.Text.Json;

namespace BibikaProject.WebUI.ExceptionMiddleware
{
    internal class ErrorDetails
    {
        public int Code { get; set; }
        public string[] Errors { get; set; }

        public override string ToString() => JsonSerializer.Serialize(this);
    }
}