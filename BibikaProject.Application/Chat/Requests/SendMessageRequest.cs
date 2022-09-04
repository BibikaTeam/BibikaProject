namespace BibikaProject.Application.Chat.Requests
{
    public class SendMessageRequest
    {
        public string Text { get; set; }

        public string FromEmail { get; set; }

        public string ToEmail { get; set; }
    }
}
