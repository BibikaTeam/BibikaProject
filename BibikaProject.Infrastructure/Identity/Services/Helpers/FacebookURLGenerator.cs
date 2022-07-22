namespace BibikaProject.Infrastructure.Identity.Services.Helpers
{
    public static class FacebookURLGenerator
    {
        public static string AppAccessToken(string appId, string appSecret)
        {
            return $"https://graph.facebook.com/oauth/access_token?client_id={appId}&client_secret={appSecret}&grant_type=client_credentials";
        }

        public static string UserAccess(string fbToken, string appAsccessToken)
        {
            return $"https://graph.facebook.com/debug_token?input_token={fbToken}&access_token={appAsccessToken}";
        }

        public static string UserInfo(string fbToken)
        {
            return $"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday&access_token={fbToken}";
        }
    }
}
