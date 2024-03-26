DROP TABLE Users;
CREATE TABLE Users (
	ID int identity(1,1) primary key,
	FirstName nvarchar(20),
	LastName nvarchar(50),
	Username nvarchar(64) not null,
	Email nvarchar(25) not null,
	Passphrase nvarchar(64) not null,
	Age int check (Age > 17) not null,
	Gender varchar(6) check (Gender in ('Man', 'Woman', 'Other', '')),
	Paid bit not null,
	IsAdmin bit not null
);
