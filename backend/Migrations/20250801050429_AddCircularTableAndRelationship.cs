using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyCareBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddCircularTableAndRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CircularId",
                table: "FileDocuments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Circulars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Circulars", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileDocuments_CircularId",
                table: "FileDocuments",
                column: "CircularId",
                unique: true,
                filter: "[CircularId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_FileDocuments_Circulars_CircularId",
                table: "FileDocuments",
                column: "CircularId",
                principalTable: "Circulars",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileDocuments_Circulars_CircularId",
                table: "FileDocuments");

            migrationBuilder.DropTable(
                name: "Circulars");

            migrationBuilder.DropIndex(
                name: "IX_FileDocuments_CircularId",
                table: "FileDocuments");

            migrationBuilder.DropColumn(
                name: "CircularId",
                table: "FileDocuments");
        }
    }
}
