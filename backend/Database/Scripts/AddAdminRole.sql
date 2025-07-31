-- Add Admin Role to User
-- This script adds the "Admin" role to the current user

-- First, let's check if the user exists
DECLARE @UserGuid NVARCHAR(50);
DECLARE @UserEmail NVARCHAR(100) = 'smit@gmail.com'; -- Replace with the actual user email

-- Get the user GUID
SELECT @UserGuid = strGUID FROM mstUsers WHERE strEmailId = @UserEmail;

IF @UserGuid IS NOT NULL
BEGIN
    -- Check if the user already has admin role
    IF NOT EXISTS (SELECT 1 FROM AspNetUserRoles WHERE UserId = @UserGuid AND RoleId = (SELECT Id FROM AspNetRoles WHERE Name = 'Admin'))
    BEGIN
        -- Add admin role to user
        INSERT INTO AspNetUserRoles (UserId, RoleId)
        SELECT @UserGuid, Id 
        FROM AspNetRoles 
        WHERE Name = 'Admin';
        
        PRINT 'Admin role added successfully to user: ' + @UserEmail;
    END
    ELSE
    BEGIN
        PRINT 'User already has admin role: ' + @UserEmail;
    END
    
    -- Show user details
    SELECT 'User Details:' as Info;
    SELECT strGUID, strName, strEmailId, bolsActive FROM mstUsers WHERE strGUID = @UserGuid;
    
    -- Show user roles
    SELECT 'User Roles:' as Info;
    SELECT r.Name as RoleName
    FROM AspNetRoles r
    INNER JOIN AspNetUserRoles ur ON r.Id = ur.RoleId
    WHERE ur.UserId = @UserGuid;
END
ELSE
BEGIN
    PRINT 'User not found with email: ' + @UserEmail;
    PRINT 'Available users:';
    SELECT strGUID, strName, strEmailId FROM mstUsers;
END 