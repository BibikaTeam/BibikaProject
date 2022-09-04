using BibikaProject.Application.Chat.Requests;
using System.Threading.Tasks;

namespace BibikaProject.Application.Chat.Services
{
    public interface IChatService
    {
        Task SendMessage(SendMessageRequest sendMessageRequest);

        Task GetMessages(GetMessagesRequest getMessagesRequest);
    }
}
