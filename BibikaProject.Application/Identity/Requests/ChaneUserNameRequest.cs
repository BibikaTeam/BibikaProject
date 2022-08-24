namespace BibikaProject.Application.Identity.Requests
{
    public class ChaneUserNameRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string  NewUserName { get; set; }
    }
}
