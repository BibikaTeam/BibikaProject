using System.Collections.Generic;

namespace BibikaProject.Domain.Entities.Chat
{
    public class Chat : BaseEntity<int>
    {
        public List<Message> Messages { get; set; }

        public List<string> UserEmails { get; set; }
    }
}
