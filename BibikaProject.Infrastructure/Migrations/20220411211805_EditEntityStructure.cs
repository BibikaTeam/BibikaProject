using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BibikaProject.Infrastructure.Migrations
{
    public partial class EditEntityStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_CarPosts_CarPostId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "CarPostOption");

            migrationBuilder.DropTable(
                name: "CarPosts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GearBox",
                table: "GearBox");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "01955e89-a620-4cd6-9aad-3daa4f597c52");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "774fcf8a-d924-447a-99b0-c8df6dfca81a");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Generations");

            migrationBuilder.DropColumn(
                name: "YearFrom",
                table: "Generations");

            migrationBuilder.DropColumn(
                name: "YearTo",
                table: "Generations");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Brands");

            migrationBuilder.RenameTable(
                name: "GearBox",
                newName: "GearBoxes");

            migrationBuilder.RenameColumn(
                name: "CarPostId",
                table: "Images",
                newName: "PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_CarPostId",
                table: "Images",
                newName: "IX_Images_PostId");

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Models",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "Generations",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "GearBoxes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_GearBoxes",
                table: "GearBoxes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CompleteSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompleteSets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Engines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Capacity = table.Column<string>(type: "text", nullable: false),
                    KWPower = table.Column<int>(type: "integer", nullable: false),
                    Fuel = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Engines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GenerationId = table.Column<int>(type: "integer", nullable: true),
                    CompleteSetId = table.Column<int>(type: "integer", nullable: true),
                    GearBoxId = table.Column<int>(type: "integer", nullable: true),
                    CarBodyId = table.Column<int>(type: "integer", nullable: true),
                    EngineId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cars_CarBodies_CarBodyId",
                        column: x => x.CarBodyId,
                        principalTable: "CarBodies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cars_CompleteSets_CompleteSetId",
                        column: x => x.CompleteSetId,
                        principalTable: "CompleteSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cars_Engines_EngineId",
                        column: x => x.EngineId,
                        principalTable: "Engines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cars_GearBoxes_GearBoxId",
                        column: x => x.GearBoxId,
                        principalTable: "GearBoxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cars_Generations_GenerationId",
                        column: x => x.GenerationId,
                        principalTable: "Generations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    SellerId = table.Column<string>(type: "text", nullable: false),
                    CarId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OptionPost",
                columns: table => new
                {
                    OptionsId = table.Column<int>(type: "integer", nullable: false),
                    PostsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionPost", x => new { x.OptionsId, x.PostsId });
                    table.ForeignKey(
                        name: "FK_OptionPost_Options_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OptionPost_Posts_PostsId",
                        column: x => x.PostsId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d1c7f312-9522-438a-9c25-70237cbe1057", "f48aaec3-3f51-4020-8a56-2b90f912681a", "User", "USER" },
                    { "a1c33749-503d-422e-b0b2-813159cb9829", "bccb46b6-d972-49f1-acfb-94c0322af949", "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Models_BrandId",
                table: "Models",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Generations_ModelId",
                table: "Generations",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarBodyId",
                table: "Cars",
                column: "CarBodyId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CompleteSetId",
                table: "Cars",
                column: "CompleteSetId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_EngineId",
                table: "Cars",
                column: "EngineId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_GearBoxId",
                table: "Cars",
                column: "GearBoxId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_GenerationId",
                table: "Cars",
                column: "GenerationId");

            migrationBuilder.CreateIndex(
                name: "IX_OptionPost_PostsId",
                table: "OptionPost",
                column: "PostsId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CarId",
                table: "Posts",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SellerId",
                table: "Posts",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Generations_Models_ModelId",
                table: "Generations",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Posts_PostId",
                table: "Images",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_Brands_BrandId",
                table: "Models",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Generations_Models_ModelId",
                table: "Generations");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Posts_PostId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Models_Brands_BrandId",
                table: "Models");

            migrationBuilder.DropTable(
                name: "OptionPost");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "CompleteSets");

            migrationBuilder.DropTable(
                name: "Engines");

            migrationBuilder.DropIndex(
                name: "IX_Models_BrandId",
                table: "Models");

            migrationBuilder.DropIndex(
                name: "IX_Generations_ModelId",
                table: "Generations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GearBoxes",
                table: "GearBoxes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1c33749-503d-422e-b0b2-813159cb9829");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d1c7f312-9522-438a-9c25-70237cbe1057");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "Generations");

            migrationBuilder.RenameTable(
                name: "GearBoxes",
                newName: "GearBox");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "Images",
                newName: "CarPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_PostId",
                table: "Images",
                newName: "IX_Images_CarPostId");

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

            migrationBuilder.AddColumn<DateTime>(
                name: "YearFrom",
                table: "Generations",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "YearTo",
                table: "Generations",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Brands",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "GearBox",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GearBox",
                table: "GearBox",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CarPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BrandId = table.Column<int>(type: "integer", nullable: false),
                    CarBodyId = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    CompleteSet = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false),
                    EngineCapacity = table.Column<string>(type: "text", nullable: false),
                    Fuel = table.Column<string>(type: "text", nullable: false),
                    GearBoxId = table.Column<int>(type: "integer", nullable: true),
                    GenerationId = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Mileage = table.Column<int>(type: "integer", nullable: false),
                    ModelId = table.Column<int>(type: "integer", nullable: false),
                    SellerId = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarPosts_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarPosts_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarPosts_CarBodies_CarBodyId",
                        column: x => x.CarBodyId,
                        principalTable: "CarBodies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarPosts_GearBox_GearBoxId",
                        column: x => x.GearBoxId,
                        principalTable: "GearBox",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarPosts_Generations_GenerationId",
                        column: x => x.GenerationId,
                        principalTable: "Generations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarPosts_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarPostOption",
                columns: table => new
                {
                    CarPostsId = table.Column<int>(type: "integer", nullable: false),
                    OptionsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarPostOption", x => new { x.CarPostsId, x.OptionsId });
                    table.ForeignKey(
                        name: "FK_CarPostOption_CarPosts_CarPostsId",
                        column: x => x.CarPostsId,
                        principalTable: "CarPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarPostOption_Options_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_CarPostOption_OptionsId",
                table: "CarPostOption",
                column: "OptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_BrandId",
                table: "CarPosts",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_CarBodyId",
                table: "CarPosts",
                column: "CarBodyId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_GearBoxId",
                table: "CarPosts",
                column: "GearBoxId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_GenerationId",
                table: "CarPosts",
                column: "GenerationId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_ModelId",
                table: "CarPosts",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_SellerId",
                table: "CarPosts",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_CarPosts_CarPostId",
                table: "Images",
                column: "CarPostId",
                principalTable: "CarPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
