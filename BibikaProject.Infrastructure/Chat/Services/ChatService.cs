﻿using AutoMapper;
using BibikaProject.Application.Chat.Commands;
using BibikaProject.Application.Chat.DTO;
using BibikaProject.Application.Chat.Queris;
using BibikaProject.Application.Chat.Requests;
using BibikaProject.Application.Chat.Services;
using BibikaProject.Domain.Entities.Chat;
using BibikaProject.Infrastructure.Core.Errors;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Chat.Services
{
    public class ChatService : IChatService
    {
        public ChatService(IMapper mapper,
                           IMessageQuery messageQuery,
                           IMessageCommand messageCommand,
                           IChatQuery chatQuery,
                           IChatCommand chatCommand)
        {
            this.mapper = mapper;
            this.messageQuery = messageQuery;
            this.messageCommand = messageCommand;
            this.chatQuery = chatQuery;
            this.chatCommand = chatCommand;
        }

        private readonly IChatCommand chatCommand;
        private readonly IChatQuery chatQuery;
        private readonly IMessageCommand messageCommand;
        private readonly IMessageQuery messageQuery;
        private readonly IMapper mapper;

        public async Task<List<MessageDTO>> GetMessages(GetMessagesRequest getMessagesRequest)
        {
            var chat = await chatQuery.GetAll()
                .Include(x => x.Messages)
                .FirstOrDefaultAsync(x => x.UserEmails.Contains(getMessagesRequest.FirstEmail) &&
                                          x.UserEmails.Contains(getMessagesRequest.SecondEmail));
            if (chat == null)
            {
                throw new NotFoundException("There is no chat between these users");
            }

            return mapper.Map<List<MessageDTO>>(chat.Messages.OrderBy(x => x.Date).ToList());
        }

        public async Task SendMessage(SendMessageRequest sendMessageRequest)
        {
            if (string.IsNullOrEmpty(sendMessageRequest.Text) ||
                string.IsNullOrEmpty(sendMessageRequest.FromEmail) ||
                string.IsNullOrEmpty(sendMessageRequest.ToEmail))
            {
                throw new BadRequestException("Send message bad request");
            }

            Message newMsg = new Message
            {
                Text = sendMessageRequest.Text,
                UserFromEmail = sendMessageRequest.FromEmail,
                UserToEmail = sendMessageRequest.ToEmail,
                Date = DateTime.UtcNow
            };

            var chat = await chatQuery.GetAll()
                .FirstOrDefaultAsync(x => x.UserEmails.Contains(sendMessageRequest.FromEmail) &&
                                          x.UserEmails.Contains(sendMessageRequest.ToEmail));

            if (chat == null)
            {
                chat = new Domain.Entities.Chat.Chat
                {
                    UserEmails = new List<string> { sendMessageRequest.FromEmail,
                                                                                       sendMessageRequest.ToEmail }
                };

                chat = await chatCommand.AddAsync(chat);
                await chatCommand.SaveChangesAsync();
            }

            newMsg.ChatId = chat.Id;

            await messageCommand.AddAsync(newMsg);
            await messageCommand.SaveChangesAsync();
        }

        public async Task<List<string>> GetChats(string email)
        {
            var chats = chatQuery.GetAll().Where(x => x.UserEmails.Contains(email));

            if (chats == null || chats.Count() == 0)
            {
                return null;
            }

            var result = new List<string>();

            await chats.ForEachAsync(x => x.UserEmails.ForEach(x =>
            {
                if (x != email)
                    result.Add(x);
            }));

            return result;
        }
        public async Task CreateChat(CreateChatRequest createChatRequest)
        {
            var chat = await chatQuery.GetAll()
                .FirstOrDefaultAsync(x => x.UserEmails.Contains(createChatRequest.FromEmail) &&
                                          x.UserEmails.Contains(createChatRequest.ToEmail));

            if (chat == null)
            {
                chat = new Domain.Entities.Chat.Chat
                {
                    UserEmails = new List<string> { createChatRequest.FromEmail, createChatRequest.ToEmail }
                };

                chat = await chatCommand.AddAsync(chat);
                await chatCommand.SaveChangesAsync();
            }
        }

        public async Task<MessageDTO> GetLastMessage(GetMessagesRequest getMessagesRequest)
        {
            var chat = await chatQuery.GetAll()
                .Include(x => x.Messages)
                .FirstOrDefaultAsync(x => x.UserEmails.Contains(getMessagesRequest.FirstEmail) &&
                                          x.UserEmails.Contains(getMessagesRequest.SecondEmail));
            if (chat == null)
            {
                throw new NotFoundException("There is no chat between these users");
            }
            if(chat.Messages.Count == 0)
            {
                throw new NotFoundException("This converstation doesn't have any messages");
            }

            return mapper.Map<MessageDTO>(chat.Messages.OrderByDescending(x => x.Date).ToList().First());
        }
    }
}
