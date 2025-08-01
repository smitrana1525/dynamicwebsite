-- Add Important Circulars category to the database
-- This script should be run manually to add the missing category

-- First, get a default user GUID (use the first available user)
DECLARE @defaultUserGuid NVARCHAR(50) = (SELECT TOP 1 strGUID FROM mstUsers);

-- If no users exist, create a default one
IF @defaultUserGuid IS NULL
BEGIN
    INSERT INTO mstUsers (strGUID, strName, strEmailId, strPassword, strOTP, dtCreatedDate, dtModifiedDate)
    VALUES (NEWID(), 'System User', 'system@moneycare.com', 'hashedpassword', '', GETDATE(), GETDATE());
    SET @defaultUserGuid = (SELECT TOP 1 strGUID FROM mstUsers);
END

-- Add the Important Circulars category if it doesn't exist
IF NOT EXISTS (SELECT 1 FROM FileCategories WHERE Name = 'Important Circulars')
BEGIN
    INSERT INTO FileCategories (Name, Icon, IsActive, SortOrder, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
    VALUES ('Important Circulars', 'Bell', 1, 4, GETDATE(), GETDATE(), @defaultUserGuid, @defaultUserGuid);
    
    PRINT 'Important Circulars category added successfully.';
END
ELSE
BEGIN
    PRINT 'Important Circulars category already exists.';
END 