

CREATE DATABASE uni;
USE uni;

CREATE TABLE `agenda` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `note` tinytext NOT NULL,
  `minutes` int NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id` int NOT NULL,
  `id_user` varchar(16) NOT NULL,
  `id_question` int NOT NULL,
  `desc` varchar(512) NOT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP
); 
-- --------------------------------------------------------

--
-- Table structure for table `goal`
--

CREATE TABLE `goal` (
  `id` int NOT NULL,
  `name` varchar(40) NOT NULL,
  `desc` varchar(64) NOT NULL,
  `expiry_date` date DEFAULT NULL,
  `planned_minutes` int DEFAULT NULL,
  `minutes` int DEFAULT NULL,
  `expected_grade` float DEFAULT NULL,
  `grade` float DEFAULT NULL,
  `finished` tinyint(1) DEFAULT '0'
) ; 

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int NOT NULL,
  `id_user` varchar(16) NOT NULL,
  `desc` varchar(128) NOT NULL,
  `title` varchar(40) NOT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP
); 

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int NOT NULL,
  `title` varchar(20) NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `report_answer`
--

CREATE TABLE `report_answer` (
  `id_answer` int NOT NULL,
  `id_user` varchar(16) NOT NULL,
  `id_report` int NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `report_question`
--

CREATE TABLE `report_question` (
  `id_question` int NOT NULL,
  `id_user` varchar(16) NOT NULL,
  `id_report` int NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `student_type`
--

CREATE TABLE `student_type` (
  `id` int NOT NULL,
  `name` varchar(20) NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int NOT NULL,
  `name` varchar(40) NOT NULL,
  `desc` varchar(64) NOT NULL,
  `minutes` int DEFAULT NULL,
  `planned_minutes` int DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `id_goal` int NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(16) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `id_student_type` int NOT NULL,
  `course_study` varchar(30) NOT NULL,
  `birth_date` date NOT NULL,
  `prof_img` blob,
  `status` tinyint(1) DEFAULT '1'
); 

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `init_uuid_user` BEFORE INSERT ON `user` FOR EACH ROW SET NEW.id = UUID(  )
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_goal`
--

CREATE TABLE `user_goal` (
  `id_user` varchar(16) NOT NULL,
  `id_goal` int NOT NULL,
  `admin` tinyint(1) DEFAULT '0'
); 

-- --------------------------------------------------------

--
-- Table structure for table `user_task_agenda`
--

CREATE TABLE `user_task_agenda` (
  `id_user` varchar(16) NOT NULL,
  `id_task` int NOT NULL,
  `id_agenda` int NOT NULL
); 

-- --------------------------------------------------------

--
-- Table structure for table `user_verification`
--

CREATE TABLE `user_verification` (
  `id` int NOT NULL,
  `verification_key` varchar(16) NOT NULL,
  `user_credentails` json NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_verified` datetime DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0'
); 

--
-- Triggers `user_verification`
--
DELIMITER $$
CREATE TRIGGER `init_uuid_user_verification` BEFORE INSERT ON `user_verification` FOR EACH ROW SET NEW.verification_key = UUID(  )
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_answer_user` (`id_user`),
  ADD KEY `fk_answer_question` (`id_question`);

--
-- Indexes for table `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_question_user` (`id_user`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_answer`
--
ALTER TABLE `report_answer`
  ADD PRIMARY KEY (`id_answer`,`id_user`,`id_report`),
  ADD KEY `fk_report_answer_user` (`id_user`),
  ADD KEY `fk_report_answer_report` (`id_report`);

--
-- Indexes for table `report_question`
--
ALTER TABLE `report_question`
  ADD PRIMARY KEY (`id_question`,`id_user`,`id_report`),
  ADD KEY `fk_report_user` (`id_user`),
  ADD KEY `fk_report_report` (`id_report`);

--
-- Indexes for table `student_type`
--
ALTER TABLE `student_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_task` (`id_goal`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_type` (`id_student_type`);

--
-- Indexes for table `user_goal`
--
ALTER TABLE `user_goal`
  ADD PRIMARY KEY (`id_user`,`id_goal`),
  ADD KEY `fk_u_goal` (`id_goal`);

--
-- Indexes for table `user_task_agenda`
--
ALTER TABLE `user_task_agenda`
  ADD PRIMARY KEY (`id_user`,`id_task`,`id_agenda`),
  ADD KEY `fk_u_task_a` (`id_task`),
  ADD KEY `fk_u_t_agenda` (`id_agenda`);

--
-- Indexes for table `user_verification`
--
ALTER TABLE `user_verification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `goal`
--
ALTER TABLE `goal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_type`
--
ALTER TABLE `student_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_verification`
--
ALTER TABLE `user_verification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `fk_answer_question` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  ADD CONSTRAINT `fk_answer_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_question_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `report_answer`
--
ALTER TABLE `report_answer`
  ADD CONSTRAINT `fk_report_answer_answer` FOREIGN KEY (`id_answer`) REFERENCES `answer` (`id`),
  ADD CONSTRAINT `fk_report_answer_report` FOREIGN KEY (`id_report`) REFERENCES `report` (`id`),
  ADD CONSTRAINT `fk_report_answer_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `report_question`
--
ALTER TABLE `report_question`
  ADD CONSTRAINT `fk_report_question` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  ADD CONSTRAINT `fk_report_report` FOREIGN KEY (`id_report`) REFERENCES `report` (`id`),
  ADD CONSTRAINT `fk_report_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_task` FOREIGN KEY (`id_goal`) REFERENCES `goal` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_type` FOREIGN KEY (`id_student_type`) REFERENCES `student_type` (`id`);

--
-- Constraints for table `user_goal`
--
ALTER TABLE `user_goal`
  ADD CONSTRAINT `fk_u_goal` FOREIGN KEY (`id_goal`) REFERENCES `goal` (`id`),
  ADD CONSTRAINT `fk_user_g` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_task_agenda`
--
ALTER TABLE `user_task_agenda`
  ADD CONSTRAINT `fk_u_t_agenda` FOREIGN KEY (`id_agenda`) REFERENCES `agenda` (`id`),
  ADD CONSTRAINT `fk_u_task_a` FOREIGN KEY (`id_task`) REFERENCES `task` (`id`),
  ADD CONSTRAINT `fk_user_t_a` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
COMMIT;

