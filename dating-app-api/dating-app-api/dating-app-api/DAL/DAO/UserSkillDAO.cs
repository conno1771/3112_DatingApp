using dating_app_api.DAL.DomainClasses;

namespace dating_app_api.DAL.DAO
{
    public class UserSkillDAO
    {
        private readonly AppDbContext _db;
        public UserSkillDAO(AppDbContext db)
        {
            _db = db;
        }
        public async Task<UserSkill> AddUserSkill(int uid, string skill)
        {
            UserSkill? userSkill = new UserSkill(uid, skill);
            //using try catch because skill must be one of those in the skill table
            //should only throw exception during testing
            try
            {

                await _db.UserSkills!.AddAsync(userSkill);
                await _db.SaveChangesAsync();
                return userSkill;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<UserSkill> GetUserSkill(int uid, string skill)
        {
            UserSkill? userSkill = await _db.UserSkills!.FindAsync(uid, skill);
            return userSkill;
        }
        public async Task<List<UserSkill>> GetUserSkills(int uid)
        {
            List<UserSkill?>? userSkills = _db.UserSkills!.Where(u => u.UserID == uid).ToList()!;
            if (userSkills.Count == 0)
            {
                return new List<UserSkill>();
            }
            return userSkills!;
        }
    }
}
