namespace BibikaProject.Infrastructure.Identity.Services.Settings
{
    public class JWTSettings
    {
        public string ValidIssuer { get; set; }
        public string ValidAudience { get; set; }
        public int Expires { get; set; }
        public string Secret { get; set; }
    }
}
