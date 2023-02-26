--Database
	CREATE DATABASE sprint4;

--Users table
	CREATE TABLE IF NOT EXISTS users(
		"id" SERIAL PRIMARY KEY,
		"name" VARCHAR(20) NOT NULL,
		"email" VARCHAR(100) NOT NULL,
		"password" VARCHAR(120) NOT NULL,
		"admin" BOOLEAN DEFAULT false NOT NULL,
		"active" BOOLEAN DEFAULT true NOT NULL
	);

--Insert User Admin
	INSERT INTO
		users("name", "email", "password")
	VALUES
		('Admin Wesley', 'wesley@admin.com', 'admin1234');

--Set ADMIN 
	UPDATE users SET admin = true WHERE "email" = 'wesley@admin.com';