-- Insert Circulars Category
IF NOT EXISTS (SELECT 1 FROM FileCategories WHERE Name = 'Important Circulars')
BEGIN
    INSERT INTO FileCategories (Name, Icon, IsActive, SortOrder, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
    VALUES ('Important Circulars', 'FileText', 1, 1, GETDATE(), GETDATE(), 'System', 'System');
END

-- Get the Circulars category ID
DECLARE @CircularsCategoryId INT = (SELECT Id FROM FileCategories WHERE Name = 'Important Circulars');

-- Insert sample circulars
IF NOT EXISTS (SELECT 1 FROM FileDocuments WHERE DisplayName = 'NEW STATUS AND SUB-STATUS FOR DEMAT ACCOUNTS')
BEGIN
    INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FileType, FileSize, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy, DownloadCount)
    VALUES (@CircularsCategoryId, 'demat-status-update.pdf', 'NEW STATUS AND SUB-STATUS FOR DEMAT ACCOUNTS', '.pdf', 245760, 1, '2024-07-24 10:00:00', '2024-07-24 10:00:00', 'System', 'System', 15);
END

IF NOT EXISTS (SELECT 1 FROM FileDocuments WHERE DisplayName = 'ADDITIONAL CRITERIA FOR DORMANT DEMAT ACCOUNTS')
BEGIN
    INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FileType, FileSize, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy, DownloadCount)
    VALUES (@CircularsCategoryId, 'dormant-accounts-criteria.pdf', 'ADDITIONAL CRITERIA FOR DORMANT DEMAT ACCOUNTS', '.pdf', 198432, 1, '2024-07-18 14:30:00', '2024-07-18 14:30:00', 'System', 'System', 8);
END

IF NOT EXISTS (SELECT 1 FROM FileDocuments WHERE DisplayName = 'VALIDATION OF KYC RECORDS WITH KRA')
BEGIN
    INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FileType, FileSize, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy, DownloadCount)
    VALUES (@CircularsCategoryId, 'kyc-validation-process.pdf', 'VALIDATION OF KYC RECORDS WITH KRA', '.pdf', 156789, 1, '2024-07-18 09:15:00', '2024-07-18 09:15:00', 'System', 'System', 12);
END

IF NOT EXISTS (SELECT 1 FROM FileDocuments WHERE DisplayName = 'SEBI MASTER CIR ON SURVEILLANCE OF SECURITIES MARKET')
BEGIN
    INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FileType, FileSize, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy, DownloadCount)
    VALUES (@CircularsCategoryId, 'sebi-surveillance-circular.pdf', 'SEBI MASTER CIR ON SURVEILLANCE OF SECURITIES MARKET', '.pdf', 345678, 1, '2024-07-10 16:45:00', '2024-07-10 16:45:00', 'System', 'System', 25);
END

IF NOT EXISTS (SELECT 1 FROM FileDocuments WHERE DisplayName = 'nihal')
BEGIN
    INSERT INTO FileDocuments (CategoryId, FileName, DisplayName, FileType, FileSize, IsActive, UploadDate, ModifiedDate, UploadedBy, ModifiedBy, DownloadCount)
    VALUES (@CircularsCategoryId, 'nihal.pdf', 'nihal', '.pdf', 241400, 1, '2024-07-31 10:00:00', '2024-07-31 10:00:00', 'System', 'System', 0);
END

PRINT 'Circulars category and sample circulars inserted successfully!'; 