using Backend.Middlewares;
using BLL.DTOs.Message;
using BLL.DTOs.Settings;
using BLL.Services;
using BLL.Services.ES;
using BLL.Services.Helper;
using BLL.Services.Interfaces;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Nest;
using ProductElasticSearch.Utility;
using System;
using System.IO;
using System.Reflection;
namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;

            }).AddEntityFrameworkStores<ApplicationDbContext>();


            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddControllers();

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IChatroomService, ChatroomService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IProfileService, ProfileService>();

            services.AddSingleton<IElasticsearchService, ElasticsearchService>();
            services.AddSingleton<IPageService, PageService>();
            services.AddSingleton<IEmailSenderService, EmailSenderService>();
            services.AddSingleton<IFileService, FileService>();

            services.AddSignalR();

            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            services.AddSwaggerGen(c =>
            {
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });


            services.AddElasticsearch(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CorsPolicy");
            }
            else
            {
                app.UseHttpsRedirection();

            }

            app.UseRouting();

            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MessageHub>("/MessageHub");
            });


            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
            });

            app.UseStaticFiles();

            CreateRoles(serviceProvider);

        }

        private void CreateRoles(IServiceProvider serviceProvider)
        {
            var adminRole = "Administrator";
            var userRole = "User";

            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            var hasAdminRole = roleManager.RoleExistsAsync(adminRole);
            hasAdminRole.Wait();
            if (!hasAdminRole.Result)
            {
                var roleResult = roleManager.CreateAsync(new IdentityRole(adminRole));
                roleResult.Wait();
            }

            var hasUserRole = roleManager.RoleExistsAsync(userRole);
            hasUserRole.Wait();
            if (!hasUserRole.Result)
            {
                var roleResult = roleManager.CreateAsync(new IdentityRole(userRole));
                roleResult.Wait();
            }

            string userName = "admin";
            var testUser = userManager.FindByNameAsync(userName);
            testUser.Wait();

            if (testUser.Result == null)
            {
                var administrator = new ApplicationUser()
                {
                    UserName = userName
                };

                var newUser = userManager.CreateAsync(administrator, "password123");
                newUser.Wait();

                if (newUser.Result.Succeeded)
                {
                    var newUserRole = userManager.AddToRoleAsync(administrator, adminRole);
                    newUserRole.Wait();
                }
            }
        }

    }
}
