using Microsoft.EntityFrameworkCore.Migrations;

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class addMillageToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Mileage",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mileage",
                table: "Posts");
        }
    }
}
