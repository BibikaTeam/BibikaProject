using System;

namespace BibikaProject.Application.Chat.DTO
{
    public class MessageDTO
    {
        public string Text { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public DateTime Date { get; set; }
    }
}
