select u.firstname, u.lastname, u.email, uk.Skills
from users u
join (select UserID, string_agg(skill, ', ') as Skills from UserSkills group by UserID) as uk
on u.ID = uk.UserID