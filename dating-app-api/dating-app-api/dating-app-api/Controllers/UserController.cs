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
                    Age = helper.Age!
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
    }
}
