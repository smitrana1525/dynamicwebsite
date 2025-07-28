using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyCareBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "mstUsers",
                columns: table => new
                {
                    strGUID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    strName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    strEmailId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    bolsActive = table.Column<bool>(type: "bit", nullable: false),
                    strPassword = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    createDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OtpExpiretIme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    strOTP = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mstUsers", x => x.strGUID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "mstUsers");
        }
    }
}
