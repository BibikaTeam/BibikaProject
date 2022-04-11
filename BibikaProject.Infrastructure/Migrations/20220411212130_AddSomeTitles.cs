using Microsoft.EntityFrameworkCore.Migrations;

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class AddSomeTitles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1c33749-503d-422e-b0b2-813159cb9829");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1c7f312-9522-438a-9c25-70237cbe1057");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Models",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Generations",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Brands",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a7c03d22-5094-491f-bc05-565959e1850f", "02294455-515e-46f7-8091-3b1e2d7bac46", "User", "USER" },
                    { "19edc165-2b98-4f4f-b2df-549920d8dcc0", "893b0ae5-0015-4e5e-8177-3698546ece84", "Administrator", "ADMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "19edc165-2b98-4f4f-b2df-549920d8dcc0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7c03d22-5094-491f-bc05-565959e1850f");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Generations");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Brands");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d1c7f312-9522-438a-9c25-70237cbe1057", "f48aaec3-3f51-4020-8a56-2b90f912681a", "User", "USER" },
                    { "a1c33749-503d-422e-b0b2-813159cb9829", "bccb46b6-d972-49f1-acfb-94c0322af949", "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
