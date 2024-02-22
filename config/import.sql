USE uni;

INSERT INTO student_type (`name`)
VALUES ('Università'),
('Superiori');

/*pw: P@ssw0rd*/

INSERT INTO `user` (name, surname, email, tel, `password`, id_student_type, course_study, birth_date) -- password: 1234
VALUES ('Alberto', 'Pavarin', 'albi@gmail.com', '1111111111', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', 1, 'Ingegneria informatica', "2005-01-03"),
('Michele', 'Gabrieli', 'miki@gmail.com', '1111111111', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', 1, 'Scienze informatiche', "2004-10-25");