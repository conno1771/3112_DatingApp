using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace dating_app_api.DAL.DomainClasses
{
    public class Skill
    {
        [Key]
        public string SkillName { get; set; }
        public string Description { get; set; }
    }
}
