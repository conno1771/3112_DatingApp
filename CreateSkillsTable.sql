DROP TABLE Skills;
GO
CREATE TABLE Skills (
	Skill varchar(50) primary key,
	Description varchar(250),
	Category varchar(50),

	CONSTRAINT fk_skills_category FOREIGN KEY (Category) REFERENCES SkillsCategories(Category) 
);