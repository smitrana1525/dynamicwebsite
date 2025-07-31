-- Insert sample data for file management system
-- First, get a user GUID from existing users
DECLARE @UserGuid NVARCHAR(50);

-- Get the first user GUID from the database
SELECT TOP 1 @UserGuid = strGUID FROM mstUsers;

-- If no users exist, create a default admin user
IF @UserGuid IS NULL
BEGIN
    SET @UserGuid = NEWID();
    INSERT INTO mstUsers (strGUID, strName, strEmailId, bolsActive, strPassword, createDate, ModifyDate, OtpExpiretIme, strOTP)
    VALUES (@UserGuid, 'Admin User', 'admin@moneycare.com', 1, 'hashedpassword', GETDATE(), GETDATE(), GETDATE(), '000000');
END

-- Insert sample categories
INSERT INTO FileCategories (Name, Description, Icon, IsActive, SortOrder, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
VALUES 
('Combine KYC Forms', 'All KYC related forms and documents for customer verification', 'FileCheck', 1, 1, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
('Other Demat Form', 'Various demat account related forms and applications', 'ClipboardList', 1, 2, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
('Policies', 'Company policies and procedures documents', 'Shield', 1, 3, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
('Other Forms', 'Miscellaneous forms and applications', 'FileText', 1, 4, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
('Important Circulars', 'Important circulars and notifications from regulatory bodies', 'Bell', 1, 5, GETDATE(), GETDATE(), @UserGuid, @UserGuid);

-- Get the inserted category IDs
DECLARE @KYC_CategoryId INT = (SELECT Id FROM FileCategories WHERE Name = 'Combine KYC Forms');
DECLARE @Demat_CategoryId INT = (SELECT Id FROM FileCategories WHERE Name = 'Other Demat Form');
DECLARE @Policies_CategoryId INT = (SELECT Id FROM FileCategories WHERE Name = 'Policies');

-- Insert sample documents (these will be placeholder entries since we can't upload actual files via SQL)
-- In a real scenario, these would be created through the file upload interface
INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FilePath, FileType, FileSize, Description, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy)
VALUES 
(@KYC_CategoryId, 'kyc-form-template.pdf', 'KYC Form Template', '/uploads/documents/kyc-form-template.pdf', '.pdf', 1024000, 'Standard KYC form template for new customers', 1, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
(@KYC_CategoryId, 'customer-verification-checklist.pdf', 'Customer Verification Checklist', '/uploads/documents/customer-verification-checklist.pdf', '.pdf', 512000, 'Comprehensive checklist for customer verification process', 1, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
(@Demat_CategoryId, 'demat-account-application.pdf', 'Demat Account Application Form', '/uploads/documents/demat-account-application.pdf', '.pdf', 2048000, 'Application form for opening demat accounts', 1, GETDATE(), GETDATE(), @UserGuid, @UserGuid),
(@Policies_CategoryId, 'company-policy-handbook.pdf', 'Company Policy Handbook', '/uploads/documents/company-policy-handbook.pdf', '.pdf', 3072000, 'Complete company policy and procedure handbook', 1, GETDATE(), GETDATE(), @UserGuid, @UserGuid);

-- Show the inserted data
SELECT 'Sample data inserted successfully' as Status;
SELECT 'Categories:' as Info;
SELECT * FROM FileCategories;
SELECT 'Documents:' as Info;
SELECT * FROM FileDocuments; 