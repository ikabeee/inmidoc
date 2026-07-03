CREATE TABLE IF NOT EXISTS admins(
    admin_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hash_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    admin_id INT NULL REFERENCES admins(admin_id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS institutions(
    institution_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS procedures(
    procedure_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    institution_id INT NOT NULL REFERENCES institutions(institution_id),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    keywords JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS requirement_documents(
    document_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    procedure_id INT NOT NULL REFERENCES procedures(procedure_id),
    name VARCHAR(255) NOT NULL
);
