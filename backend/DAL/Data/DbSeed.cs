using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Data
{
    public class DbSeed
    {
        public void Seed(ModelBuilder builder)
        {
            ApplicationUserSeed(builder);
            ChatRoomSeed(builder);
            MessageSeed(builder);
        }

        private void ApplicationUserSeed(ModelBuilder builder)
        {
            var testUser = new ApplicationUser
            {
                Id = "e87a50b7-ce6b-4eb9-b99c-a7a4b01e80db",
                Email = "test@test.test",
                NormalizedEmail = "TEST@TEST.TEST",
                UserName = "test@test.test",
                NormalizedUserName = "TEST@TEST.TEST",
                SecurityStamp = "string",
                PictureUrl = ""
            };

            var password = new PasswordHasher<ApplicationUser>();
            var hashed = password.HashPassword(testUser, "123456");
            testUser.PasswordHash = hashed;

            builder.Entity<ApplicationUser>().HasData(testUser);
        }

        private void ChatRoomSeed(ModelBuilder builder)
        {
            builder.Entity<Chatroom>().HasData(new Chatroom
            {
                Id = new Guid("fe1ee058-9e79-4544-bf93-026f477fe843"),
                Name = "General",
                Date = new DateTime(),
                Details = "This is my first chatRoom",
                OwnerUserId = "e87a50b7-ce6b-4eb9-b99c-a7a4b01e80db"
            });
        }
        private void MessageSeed(ModelBuilder builder)
        {
            builder.Entity<Message>().HasData(new Message
            {
                Id = new Guid("fe1ee058-9e79-4544-bf93-026f477fe843"),
                Date = new DateTime(),
                ChatRoomId = new Guid("fe1ee058-9e79-4544-bf93-026f477fe843"),
                UserId = "e87a50b7-ce6b-4eb9-b99c-a7a4b01e80db",
                Content = "This is the firs message in this room"
            });
        }
    }
}
