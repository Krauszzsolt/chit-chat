using Backend.Middlewares;
using BLL.DTOs.Settings;
using BLL.Services;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

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

            // ass CORS for dev
            services.AddCors();

            services.AddControllers();

            // configure DI for application services
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            // configure strongly typed settings object
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            // register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                // set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // global cors policy
                app.UseCors(x => x
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
            });


            CreateRoles(serviceProvider);

        }

        private void CreateRoles(IServiceProvider serviceProvider)
        {
            // roles
            var adminRole = "Administrator";
            var userRole = "User";

            // managers
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            // check that there is an Administrator role and create if not

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

            // add to the Administrator role

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
