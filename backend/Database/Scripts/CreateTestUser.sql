-- Create a test user for MoneyCare application
-- Password: Test123! (hashed with BCrypt)

-- First, check if user already exists
IF NOT EXISTS (SELECT 1 FROM mstUsers WHERE strEmailId = 'test@example.com')
BEGIN
    INSERT INTO mstUsers (
        strGUID, 
        strName, 
        strEmailId, 
        bolsActive, 
        strPassword, 
        createDate, 
        ModifyDate, 
        OtpExpiretIme, 
        strOTP
    ) VALUES (
        'test-user-guid-123',
        'Test User',
        'test@example.com',
        1,
        '$2a$11$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Test123!
        GETDATE(),
        GETDATE(),
        GETDATE(),
        '000000'
    );
    
    PRINT 'Test user created successfully!';
END
ELSE
BEGIN
    PRINT 'Test user already exists!';
END

-- Verify the user was created
SELECT * FROM mstUsers WHERE strEmailId = 'test@example.com'; 