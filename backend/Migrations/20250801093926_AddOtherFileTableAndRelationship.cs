using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyCareBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddOtherFileTableAndRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OtherFileId",
                table: "FileDocuments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OtherFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FileType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FileDocumentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherFiles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileDocuments_OtherFileId",
                table: "FileDocuments",
                column: "OtherFileId",
                unique: true,
                filter: "[OtherFileId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_FileDocuments_OtherFiles_OtherFileId",
                table: "FileDocuments",
                column: "OtherFileId",
                principalTable: "OtherFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileDocuments_OtherFiles_OtherFileId",
                table: "FileDocuments");

            migrationBuilder.DropTable(
                name: "OtherFiles");

            migrationBuilder.DropIndex(
                name: "IX_FileDocuments_OtherFileId",
                table: "FileDocuments");

            migrationBuilder.DropColumn(
                name: "OtherFileId",
                table: "FileDocuments");
        }
    }
}
