-- Create Companies table
CREATE TABLE Companies (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    CompanyName NVARCHAR(255) NOT NULL,
    Domain NVARCHAR(255) NOT NULL UNIQUE,
    Industry NVARCHAR(255),
    Website NVARCHAR(255)
);

-- Create Employees table
CREATE TABLE Employees (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Phone NVARCHAR(50),
    JobTitle NVARCHAR(255),
    CompanyID INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CompanyID) REFERENCES Companies(ID) ON DELETE CASCADE
);

-- Create index for CompanyID
CREATE INDEX idx_employees_company_id ON Employees(CompanyID);


----------------------------------
-- Seed data --
----------------------------------

