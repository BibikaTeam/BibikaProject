namespace BibikaProject.Application.Identity.Requests
{
    public class GoogleLoginRequest
    {
        public string ClientId { get; set; }

        public string Credential { get; set; }
    }
}
