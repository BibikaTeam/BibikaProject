using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class addAdvFieldsToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Balance",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BannerShowsLeft",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DailyPoint",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DailyViews",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsBanner",
                table: "Posts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTrend",
                table: "Posts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Posts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrendShowsLeft",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "BannerShowsLeft",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "DailyPoint",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "DailyViews",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsBanner",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsTrend",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TrendShowsLeft",
                table: "Posts");
        }
    }
}
