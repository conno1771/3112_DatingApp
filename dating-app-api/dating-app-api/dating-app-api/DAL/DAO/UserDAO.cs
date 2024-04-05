using dating_app_api.DAL.DomainClasses;
using Microsoft.EntityFrameworkCore;
using System;

namespace dating_app_api.DAL.DAO
{
    public class UserDAO
    {
        private readonly AppDbContext _db;
        public UserDAO(AppDbContext db)
        {
            _db = db;
        }
        public async Task<User> Register(User user)
        {
            await _db.Users!.AddAsync(user);
            await _db.SaveChangesAsync();
            return user;
        }
        public async Task<User?> GetByEmail(string? email)
        {
            User? user = await _db.Users!.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }
        public async Task<User?> GetByUsername(string? username)
        {
            User? user = await _db.Users!.FirstOrDefaultAsync(x => x.Username == username);
            return user;
        }
        public async Task<bool> IsPaidUser(string? email)
        {
            User? user = await GetByEmail(email);
            return user!.Paid == true;
        }
        public async Task<bool> IsAdmin(string? email)
        {
            User? user = await GetByEmail(email);
            return user!.IsAdmin == true;
        }
        public async Task<UserReview?> AddReview(int uid, int quality)
        {
            User? user = await _db.Users!.FirstOrDefaultAsync(x => x.Id == uid);
            if (user == null)
            {
                return null;
            } else if (quality > 5 || quality < 0)
            {
                return null;
            }
            UserReview ur = new UserReview()
            {
                Quality = quality,
                UserId = uid,
                ReviewDate = DateTime.Now.ToShortDateString()
            };
            await _db.UserReviews!.AddAsync(ur);
            await _db.SaveChangesAsync();
            return ur;
        }
    }
}
