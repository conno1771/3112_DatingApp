using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dating_app_api.DAL.DomainClasses
{
    [PrimaryKey("UserID", "Skill")]
    public class UserSkill
    { public int UserID { get; set; }
        public string Skill{ get; set; }

        public UserSkill(int UserID, string Skill)
        {
            this.UserID = UserID;
            this.Skill = Skill;
        }
    }
}
