using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class addViewsToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserPost1");
        }
    }
}
