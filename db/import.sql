USE uni;

INSERT INTO student_type (`name`)
VALUES ('Università'),
('Superiori');

INSERT INTO `user` (name, surname, email, tel, `password`, id_student_type, course_study, birth_date) -- password: 1234
VALUES ('Alberto', 'Pavarin', 'albi@gmail.com', '1111111111', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, 'Ingegneria informatica', "2005-01-03"),
('Michele', 'Gabrieli', 'miki@gmail.com', '1111111111', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, 'Scienze informatiche', "2004-10-25");