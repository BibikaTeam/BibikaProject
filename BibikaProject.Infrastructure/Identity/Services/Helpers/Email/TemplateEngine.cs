using System;
using System.IO;

namespace BibikaProject.Infrastructure.Identity.Services.Helpers.Email
{
    public static class TemplateEngine
    {
        public static string GetResetPasswordTemplate(string userName, string token)
        {
            var path = Directory.GetParent(Environment.CurrentDirectory) + 
                       "\\BibikaProject.Infrastructure\\Identity\\Services\\Helpers\\Email\\Templates\\ResetPasswordTemplate.html";

            var text = File.ReadAllText(path);

            text = text.Replace("$name", userName);
            text = text.Replace("$token", token);

            return text;
        }
    }
}
