using Microsoft.EntityFrameworkCore.Migrations;

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class AddIdsToCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CompleteSets_CompleteSetId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Engines_EngineId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_GearBoxes_GearBoxId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Generations_GenerationId",
                table: "Cars");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e676f7ea-fc2a-4c11-8173-c48e21f9dbfd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5c801ee-6682-4e06-b8b0-b3887b7d6862");

            migrationBuilder.AlterColumn<int>(
                name: "GenerationId",
                table: "Cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GearBoxId",
                table: "Cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EngineId",
                table: "Cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CompleteSetId",
                table: "Cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CarBodyId",
                table: "Cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars",
                column: "CarBodyId",
                principalTable: "CarBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CompleteSets_CompleteSetId",
                table: "Cars",
                column: "CompleteSetId",
                principalTable: "CompleteSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Engines_EngineId",
                table: "Cars",
                column: "EngineId",
                principalTable: "Engines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_GearBoxes_GearBoxId",
                table: "Cars",
                column: "GearBoxId",
                principalTable: "GearBoxes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Generations_GenerationId",
                table: "Cars",
                column: "GenerationId",
                principalTable: "Generations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CompleteSets_CompleteSetId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Engines_EngineId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_GearBoxes_GearBoxId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Generations_GenerationId",
                table: "Cars");

            migrationBuilder.AlterColumn<int>(
                name: "GenerationId",
                table: "Cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "GearBoxId",
                table: "Cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EngineId",
                table: "Cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CompleteSetId",
                table: "Cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CarBodyId",
                table: "Cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e676f7ea-fc2a-4c11-8173-c48e21f9dbfd", "2cc43474-475b-4758-934a-a2b77bc12756", "User", "USER" },
                    { "f5c801ee-6682-4e06-b8b0-b3887b7d6862", "97b0670a-c99d-4c1d-9ad9-4d0e62cf73ce", "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarBodies_CarBodyId",
                table: "Cars",
                column: "CarBodyId",
                principalTable: "CarBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CompleteSets_CompleteSetId",
                table: "Cars",
                column: "CompleteSetId",
                principalTable: "CompleteSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Engines_EngineId",
                table: "Cars",
                column: "EngineId",
                principalTable: "Engines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_GearBoxes_GearBoxId",
                table: "Cars",
                column: "GearBoxId",
                principalTable: "GearBoxes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Generations_GenerationId",
                table: "Cars",
                column: "GenerationId",
                principalTable: "Generations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
