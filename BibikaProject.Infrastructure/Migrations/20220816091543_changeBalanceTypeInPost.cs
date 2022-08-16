using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class changeBalanceTypeInPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Balance",
                table: "Posts",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Balance",
                table: "Posts",
                type: "integer",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
