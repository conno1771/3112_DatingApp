using dating_app_api.DAL;
using dating_app_api.DAL.DAO;
using dating_app_api.DAL.DomainClasses;
using dating_app_api.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace dating_app_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly AppDbContext? _ctx;
        readonly IConfiguration configuration;
        public UserController(AppDbContext context, IConfiguration config)
        {
            _ctx = context;
            this.configuration = config;
        }
        [HttpPost]
        [Route("/Register")]
        [Produces("application/json")]
        [AllowAnonymous]
        public async Task<ActionResult<UserHelper>> Register(UserHelper helper)
        {
            UserDAO dao = new(_ctx!);
            User? already = await dao.GetByEmail(helper.Email);
            if (already == null && helper.Age >= 18 && (helper.Gender == "Man" || helper.Gender == "Woman" || helper.Gender == "Other" || helper.Gender == ""))
            {
                User dbUser = new()
                {
                    Firstname = helper.FirstName,
                    Lastname = helper.LastName,
                    Username = helper.Username!,
                    Email = helper.Email!,
                    Passphrase = helper.Passphrase!,
                    Age = helper.Age!,
                    Paid = helper.Paid!,
                    IsAdmin = helper.IsAdmin!
                };
                dbUser = await dao.Register(dbUser);
                if (dbUser.Id > 0)
                    helper.Token = "user registered";
                else
                {
                    helper.Token = "user registration failed: reason unknown";
                }
            }
            else if (helper.Gender != "Man" && helper.Gender != "Woman" && helper.Gender != "Other" && helper.Gender != "")
            {
                helper.Token = "user registration failed: gender invalid";
            }
            else if (helper.Age < 18)
            {
                helper.Token = "user registration failed: user too young";
            }
            else
            {
                helper.Token = "user registration failed - email already in use";
            }
            return helper;
        }
        [HttpPost]
        [Route("/Login")]
        [Produces("application/json")]
        [AllowAnonymous]
        public async Task<ActionResult<UserHelper>> Login(UserHelper helper)
        {
            UserDAO dao = new(_ctx!);
            User? user;
            if (helper.Username != null && helper.Username != "") { user = await dao.GetByUsername(helper.Username); }
            else
            {
                user = await dao.GetByEmail(helper.Email);
            }
            if (user != null)
            {
                if (helper.Passphrase == user.Passphrase)
                {
                    helper.Token = "Login Successful";
                    helper.Username = user.Username;
                    helper.Email = user.Email;
                    helper.Age = user.Age;
                    helper.Gender = user.Gender == null ? "" : user.Gender;
                    helper.FirstName = user.Firstname;
                    helper.LastName = user.Lastname;
                    helper.Paid = user.Paid;
                    helper.IsAdmin = user.IsAdmin;
                }
                else
                {
                    helper.Token = "Login Unsuccessful: Incorrect Password";
                }
            }
            else
            {
                helper.Token = "Login Unsuccessful: User does not exist";
            }
            return helper;
        }
        [HttpPost]
        [Route("/AddUserSkill")]
        [Produces("application/json")]
        [AllowAnonymous]
        public async Task<ActionResult<UserSkillHelper>> AddUserSkill(string email, string skill)
        {
            UserDAO userDAO = new(_ctx!);
            UserSkillDAO userSkillDAO = new(_ctx!);
            User? user = await userDAO.GetByEmail(email);
            if (user == null)
            {
                return new UserSkillHelper() { UserId = 0, Skill = "", Token = "ERROR: User does not exist" };
            }
            if (await userSkillDAO.GetUserSkill(user.Id, skill) != null)
            {
                return new UserSkillHelper() { UserId = user.Id, Skill = skill, Token = "ERROR: User and Skill are already linked" };
            }
            UserSkill userSkill = await userSkillDAO.AddUserSkill(user.Id, skill);

            if (userSkill.UserID > 1 && userSkill.Skill != "")
            {
                return new UserSkillHelper() { UserId = userSkill.UserID, Skill = userSkill.Skill, Token = "Skill Added" };
            }
            else
            {
                return new UserSkillHelper() { UserId = userSkill.UserID, Skill = userSkill.Skill, Token = "ERROR: Skill not added" };
            }
        }
        [HttpGet]
        [Route("/IsUserPaid")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> IsUserPaid(string email)
        {
            UserDAO uDAO = new(_ctx!);
            bool isPaid = await uDAO.IsPaidUser(email);
            return isPaid;
        }
        [HttpGet]
        [Route("/IsAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> IsUserAdmin(string email)
        {
            UserDAO uDAO = new(_ctx!);
            bool isAdmin = await uDAO.IsAdmin(email);
            return isAdmin;
        }
        [HttpGet]
        [Route("/GetUser")]
        [AllowAnonymous]
        public async Task<ActionResult<UserHelper>> GetUser(string email)
        {
            UserDAO uDAO = new(_ctx);
            User? user = await uDAO.GetByEmail(email);
            if (user == null)
            {
                return new UserHelper()
                {
                    Token = "User does not exist",
                    Username = "",
                    Email = "",
                    Age = 0,
                    Gender = "",
                    FirstName = "",
                    LastName = "",
                    Paid = false,
                    IsAdmin = false
                };
            }
            else
            {
                return new UserHelper()
                {
                    Token = "",
                    Username = user.Username,
                    Email = user.Email,
                    Age = user.Age,
                    Gender = user.Gender == null ? "" : user.Gender,
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    Paid = user.Paid,
                    IsAdmin = user.IsAdmin,
                    Passphrase = user.Passphrase
                };
            }
        }
        [HttpGet]
        [Route("/GetUserSkills")]
        [AllowAnonymous]
        public async Task<ActionResult<List<string>>> GetUserSkills(string email)
        {
            UserDAO uDAO = new(_ctx);
            UserSkillDAO usDAO = new(_ctx);

            User? user = await uDAO.GetByEmail(email);

            if (user == null)
            {
                return new List<string>() { "ERROR: User does not exist" };
            }

            List<UserSkill?> userSkills = await usDAO.GetUserSkills(user.Id);
            if (userSkills.Count == 0)
            {
                return new List<string>();
            }
            List<string> userSkillStrings = new List<string>();
            foreach (var item in userSkills)
            {
                userSkillStrings.Add(item!.Skill);
            }
            return userSkillStrings;
        }
    }
}
