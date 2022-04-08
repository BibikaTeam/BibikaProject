using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class UpdateCarPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1bce652a-5203-4f73-a45d-9abab3dd69ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c5bdd20-0a27-4dbd-ac42-98b535303e0d");

            migrationBuilder.RenameColumn(
                name: "GearBox",
                table: "CarPosts",
                newName: "Fuel");

            migrationBuilder.RenameColumn(
                name: "Engine",
                table: "CarPosts",
                newName: "EngineCapacity");

            migrationBuilder.AddColumn<int>(
                name: "GearBoxId",
                table: "CarPosts",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GearBox",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GearBox", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "01955e89-a620-4cd6-9aad-3daa4f597c52", "7619a3cc-0067-4403-b376-c171bd5b8f4f", "User", "USER" },
                    { "774fcf8a-d924-447a-99b0-c8df6dfca81a", "a307500b-05bb-466d-82c9-fcb65c039375", "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_GearBoxId",
                table: "CarPosts",
                column: "GearBoxId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarPosts_GearBox_GearBoxId",
                table: "CarPosts",
                column: "GearBoxId",
                principalTable: "GearBox",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarPosts_GearBox_GearBoxId",
                table: "CarPosts");

            migrationBuilder.DropTable(
                name: "GearBox");

            migrationBuilder.DropIndex(
                name: "IX_CarPosts_GearBoxId",
                table: "CarPosts");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "01955e89-a620-4cd6-9aad-3daa4f597c52");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "774fcf8a-d924-447a-99b0-c8df6dfca81a");

            migrationBuilder.DropColumn(
                name: "GearBoxId",
                table: "CarPosts");

            migrationBuilder.RenameColumn(
                name: "Fuel",
                table: "CarPosts",
                newName: "GearBox");

            migrationBuilder.RenameColumn(
                name: "EngineCapacity",
                table: "CarPosts",
                newName: "Engine");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c5bdd20-0a27-4dbd-ac42-98b535303e0d", "d4dac6c5-4193-4586-9c3d-c83482bca661", "User", "USER" },
                    { "1bce652a-5203-4f73-a45d-9abab3dd69ee", "9da5712b-4a57-4fd6-ad79-97f2c4f0b3a1", "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
