using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class addViewPostTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserPost1");

            migrationBuilder.CreateTable(
                name: "ViewPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    PostId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ViewPosts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ViewPosts_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ViewPosts_PostId",
                table: "ViewPosts",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_ViewPosts_UserId",
                table: "ViewPosts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ViewPosts");

            migrationBuilder.CreateTable(
                name: "ApplicationUserPost1",
                columns: table => new
                {
                    ViewedPostsId = table.Column<int>(type: "integer", nullable: false),
                    ViewsId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserPost1", x => new { x.ViewedPostsId, x.ViewsId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserPost1_AspNetUsers_ViewsId",
                        column: x => x.ViewsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserPost1_Posts_ViewedPostsId",
                        column: x => x.ViewedPostsId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserPost1_ViewsId",
                table: "ApplicationUserPost1",
                column: "ViewsId");
        }
    }
}
