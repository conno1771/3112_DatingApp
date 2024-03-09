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
    }
}
