using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Identity.Services.Helpers.Email
{
    public class EmailSender
    {
        private readonly EmailConfiguration emailConfig;

        public EmailSender(EmailConfiguration emailConfig)
        {
            this.emailConfig = emailConfig;
        }

        public async Task SendAsync(string to, string subject, string body)
        {        
            var message = new MimeMessage();

            message.From.Add(MailboxAddress.Parse(emailConfig.From));
            message.To.Add(MailboxAddress.Parse(to));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Html) { Text = body };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(emailConfig.SmtpServer, emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(emailConfig.UserName, emailConfig.Password);
                    await client.SendAsync(message);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
