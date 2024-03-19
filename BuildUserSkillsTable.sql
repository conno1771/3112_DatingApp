CREATE TABLE UserSkills (
	UserID int not null,
	Skill varchar(50) not null

	PRIMARY KEY (UserID, Skill)
	FOREIGN KEY (UserID) REFERENCES dbo.Users (ID)
	ON DELETE CASCADE
ON UPDATE NO ACTION,
	FOREIGN KEY (Skill) REFERENCES dbo.Skills (Skill)
	ON DELETE CASCADE
ON UPDATE NO ACTION
)