using System;

namespace BibikaProject.Domain.Entities.Chat
{
    public class Message : BaseEntity<int>
    {
        public string Text { get; set; }

        public int ChatId { get; set; }

        public Chat Chat { get; set; }

        public string UserFromEmail { get; set; }

        public string UserToEmail { get; set; }

        public DateTime Date { get; set; }
    }
}
