namespace dating_app_api.Helpers
{
    public class UserHelper
    {
        public string? FirstName { get; set; } = "";
        public string? LastName { get; set; } = "";
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Passphrase { get; set; }
        public string? Token { get; set; } = "";
        public int? Age { get; set; } = 0;
        public string? Gender { get; set; } = "";
        public bool? IsPaid { get; set; } = false;
        public bool? Admin { get; set; } = false;
    }
}
