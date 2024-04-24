USE uni;

INSERT INTO student_type (`name`)
VALUES ('Università'),
('Superiori');

/*pw: P@ssw0rd*/

INSERT INTO `user` (name, surname, email, tel, `password`, id_student_type, course_study, birth_date) -- password: 1234
VALUES ('Alberto', 'Pavarin', 'albi@gmail.com', '1111111111', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', 1, 'Ingegneria informatica', "2005-01-03"),
('Michele', 'Gabrieli', 'miki@gmail.com', '1111111111', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', 1, 'Scienze informatiche', "2004-10-25");

INSERT INTO palette_color(primary_color, secondary_color) VALUES
    ("F55C7A", "B02D47"), 
    ("FF9770", "EA622F"),
    ("E3B26A", "BB883B"), 
    ("6FA876", "56805B"), 
    ("6C8DFA", "434CC8"),
    ("82BBBB", "5D8888"), 
    ("B1C08F", "84955E"), 
    ("CF9FA3", "997376"), 
    ("8A4EAB", "B18AC7"); 

INSERT INTO img_profile(`path`, `desc`)
VALUES ("male1.png", "provaa"), 
("male2.png", "provaa"), 
("male3.png", "provaa"), 
("male4.png", "provaa"), 
("female1.png", "provaa"), 
("female2.png", "provaa"), 
("female3.png", "provaa"), 
("female4.png", "provaa"), 
("female5.png", "provaa"); 