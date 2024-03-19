namespace dating_app_api.Helpers
{
    public class UserSkillHelper
    {
        public int? UserId { get; set; } = 0;
        public string? Skill { get; set; } = "";
        public string? Token { get; set; } = "";

        public UserSkillHelper(int userid, string skill, string token)
        {
            UserId = userid;
            Skill = skill;
            Token = token;
        }
    }
}
