using BibikaProject.Application.Chat.Requests;
using BibikaProject.Application.Chat.Services;
using BibikaProject.Application.Core.Services;
using BibikaProject.Application.Identity.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BibikaProject.WebUI.Controllers
{
    [Route("api/user/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserService userService, IChatService chatService)
        {
            this.userService = userService;
            this.chatService = chatService;
        }

        private readonly IUserService userService;
        private readonly IChatService chatService;

        [HttpPost("like")]
        [Authorize]
        public async Task<IActionResult> LikePost(int postId)
        {
            await userService.LikePost(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value, postId);

            return Ok();
        }

        [HttpPost("view")]
        [Authorize]
        public async Task<IActionResult> ViewPost(int postId)
        {
            await userService.ViewPost(HttpContext.User.Claims.First(x => x.Type == UserJWTClaimTypes.Id).Value, postId);

            return Ok();
        }

        [HttpPost("send-message/")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest sendMessageRequest)
        {
            await chatService.SendMessage(sendMessageRequest);

            return Ok();
        }

        [HttpGet("get-message/")]
        [Authorize]
        public async Task<IActionResult> GetMessages([FromQuery] string email)
        {
            var result = await chatService.GetMessages(new GetMessagesRequest
            {
                FirstEmail = email,
                SecondEmail = HttpContext.User.Claims.First(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value
            });

            return Ok(result);
        }

        [HttpGet("get-chats/")]
        [Authorize]
        public async Task<IActionResult> GetChats()
        {
            var result = await chatService.GetChats(HttpContext.User.Claims.First(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value);

            return Ok(result);
        }
        [HttpPost("create-chat/")]
        [Authorize]
        public async Task<IActionResult> CreateChat([FromBody] CreateChatRequest createChatRequest)
        {
            await chatService.CreateChat(createChatRequest);

            return Ok();
        }
    }
}
