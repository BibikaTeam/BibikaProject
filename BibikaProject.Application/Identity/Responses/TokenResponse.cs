namespace BibikaProject.Application.Identity.Responses
{
    public class TokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string Error { get; set; }
    }
}
