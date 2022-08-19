using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class addPriceToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Posts");
        }
    }
}
