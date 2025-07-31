-- Insert sample categories for file management system
-- Make sure to replace 'YOUR_USER_GUID' with an actual user GUID from your mstUsers table

INSERT INTO FileCategories (Name, Description, Icon, IsActive, SortOrder, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy)
VALUES 
('Combine KYC Forms', 'All KYC related forms and documents for customer verification', 'FileCheck', 1, 1, GETDATE(), GETDATE(), 'YOUR_USER_GUID', 'YOUR_USER_GUID'),
('Other Demat Form', 'Various demat account related forms and applications', 'ClipboardList', 1, 2, GETDATE(), GETDATE(), 'YOUR_USER_GUID', 'YOUR_USER_GUID'),
('Policies', 'Company policies and procedures documents', 'Shield', 1, 3, GETDATE(), GETDATE(), 'YOUR_USER_GUID', 'YOUR_USER_GUID'),
('Other Forms', 'Miscellaneous forms and applications', 'FileText', 1, 4, GETDATE(), GETDATE(), 'YOUR_USER_GUID', 'YOUR_USER_GUID'),
('Important Circulars', 'Important circulars and notifications from regulatory bodies', 'Bell', 1, 5, GETDATE(), GETDATE(), 'YOUR_USER_GUID', 'YOUR_USER_GUID');

-- Note: Replace 'YOUR_USER_GUID' with an actual user GUID from your mstUsers table
-- You can get a user GUID by running: SELECT strGUID FROM mstUsers LIMIT 1; 