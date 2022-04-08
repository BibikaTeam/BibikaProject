using System.Text.Json;

namespace BibikaProject.WebUI.ExceptionMiddleware
{
    internal class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public override string ToString() => JsonSerializer.Serialize(this);
    }
}