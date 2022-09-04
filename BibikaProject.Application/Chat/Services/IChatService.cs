﻿using BibikaProject.Application.Chat.DTO;
using BibikaProject.Application.Chat.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Chat.Services
{
    public interface IChatService
    {
        Task SendMessage(SendMessageRequest sendMessageRequest);

        Task<List<MessageDTO>> GetMessages(GetMessagesRequest getMessagesRequest);
    }
}
