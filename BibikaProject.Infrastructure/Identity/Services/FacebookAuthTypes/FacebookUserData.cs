﻿using Newtonsoft.Json;

namespace BibikaProject.Infrastructure.Identity.Services.FacebookAuthTypes
{
    public class FacebookUserData
    {
        public long Id { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Locale { get; set; }
    }
}
