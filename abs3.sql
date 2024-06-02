-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2024 at 08:41 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abs3`
--

-- --------------------------------------------------------

--
-- Table structure for table `bloghistories`
--

CREATE TABLE `bloghistories` (
  `Id` int(11) NOT NULL,
  `BlogId` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `Content` longtext NOT NULL,
  `Category` longtext NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `blogreactions`
--

CREATE TABLE `blogreactions` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `BlogId` int(11) NOT NULL,
  `IsUpVote` tinyint(1) DEFAULT NULL,
  `IsDownVote` tinyint(1) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogreactions`
--

INSERT INTO `blogreactions` (`Id`, `UserId`, `BlogId`, `IsUpVote`, `IsDownVote`, `CreatedAt`) VALUES
(1, 4, 2, 0, 1, '2024-05-10 06:14:33.713692');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `Id` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `Content` longtext NOT NULL,
  `Score` int(11) NOT NULL,
  `ImagePath` longtext NOT NULL,
  `UserId` int(11) NOT NULL,
  `Category` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `IsEdited` tinyint(1) NOT NULL,
  `UpVoteCount` int(11) NOT NULL,
  `DownVoteCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`Id`, `Title`, `Content`, `Score`, `ImagePath`, `UserId`, `Category`, `CreatedAt`, `UpdatedAt`, `IsEdited`, `UpVoteCount`, `DownVoteCount`) VALUES
(1, 'Roadmap to Learn AI in 2024', 'Machine learning relies heavily on three pillars of mathematics: linear algebra, calculus, probability, and statistics. Each plays a unique role in enabling algorithms to function effectively.\r\n\r\nLinear Algebra: the mathematical toolkit for data representation and manipulation, where matrices and vectors form the language for algorithms to interpret and process information\r\nCalculus: The engine for optimization in machine learning, enabling algorithms to learn and improve by understanding gradients and rates of change.\r\nProbability and Statistics: The foundation for decision-making under uncertainty, allowing algorithms to predict outcomes and learn from data through models of randomness and variability.\r\n\r\n', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\ae6164a6-a9d5-454b-9937-30159f790fd5.png', 1, 'Technology', '2024-05-10 05:43:24.911640', NULL, 0, 0, 0),
(2, 'How To Detect An AI Written Article', 'Depth and originality\r\nOne of the first clues to look for is a lack of depth or originality. AI-generated content often gives a generalization of a topic rather than anything with meat in it. I always think that the writing AI bots have been trained on clickbait articles because that is all they can manage to produce!\r\n\r\nOverly dramatic\r\n“In the Wild West of the internet, a new breed of gunslingers has emerged”\r\n\r\nIt’s like the opening line from a very bad B-movie. But the over-dramatic and fancy sentences are a good indication that the piece was not only written by AI, but also it was given the all clear by someone that knows nothing about writing.\r\n\r\nI can just imagine the creator saying, “WOW, that looks amazing. I think I will write my own story”\r\n\r\nIt was a cold and windy night. A bang awoke him, or was he still asleep and this was all a dream?\r\n\r\nRepetition\r\nAnother AI problem is repetitive language and keyword stuffing. AI, bless its cold heart, can go a bit crazy with the keywords, spraying rather than just sprinkling the article with the same words over and over again.\r\n\r\nBold as brass\r\nTalking of keywords, artificial intelligence just loves using the bold feature when it writes to highlight SEO long-tailed keywords that the person who wrote the prompt asked for. So if you see a lot of random bold text such as these, it’s another of those tracking signs that the article was written by AI.\r\n\r\nA set formula\r\nAI writing often follows a predictable, formulaic structure. From lists to bullet points.\r\n\r\nOften lists are written as #5 The Formula. I have used this format myself until I saw that the AI uses it!', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\aa652875-ebae-48d5-9d4f-8abb4adaf949.png', 1, 'Technology', '2024-05-10 05:45:14.777391', NULL, 0, 0, 1),
(3, 'How To Wake Up at 5 A.M. Every Day', 'I thought I was destined to be a night owl forever.\r\n\r\nI’m no stranger to reading about the benefits of waking up early or having the same sleeping routine — all of us have probably read this at some point in our lives. I’m in my final semester of university, so the past few years of my life have been absolute chaos. I have classes some days, work other days, and have free time on especially rare days. Having a routine seemed impossible.\r\n\r\nBut a few months ago, I started reading Haruki Murakami’s novels. My favorite is Norwegian Wood. Inspired by Murakami’s fascinating prose, I researched him a little.\r\n\r\nI found this gem in a 2004 interview he did:\r\n\r\nWhen I’m in writing mode for a novel, I get up at 4 a.m. and work for five to six hours. In the afternoon, I run for ten kilometers or swim for fifteen hundred meters (or do both), then I read a bit and listen to some music. I go to bed at 9 p.m.\r\n\r\nI keep to this routine every day without variation. The repetition itself becomes the important thing; it’s a form of mesmerism. I mesmerize myself to reach a deeper state of mind.\r\n\r\nBut to hold to such repetition for so long — six months to a year — requires a good amount of mental and physical strength. In that sense, writing a long novel is like survival training. Physical strength is as necessary as artistic sensitivity.', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\5e1b73ee-8c53-4ecc-907e-79817465f25e.png', 1, 'Lifestyle', '2024-05-10 05:46:19.141181', NULL, 0, 0, 0),
(4, 'Maybe Better If You Don’t Read This Story on Public WiFi', '\r\nIn his backpack, Wouter Slotboom, 34, carries around a small black device, slightly larger than a pack of cigarettes, with an antenna on it. I meet Wouter by chance at a random cafe in the center of Amsterdam. It is a sunny day and almost all the tables are occupied. Some people talk, others are working on their laptops or playing with their smartphones.\r\n\r\nWouter removes his laptop from his backpack, puts the black device on the table, and hides it under a menu. A waitress passes by and we ask for two coffees and the password for the WiFi network. Meanwhile, Wouter switches on his laptop and device, launches some programs, and soon the screen starts to fill with green text lines. It gradually becomes clear that Wouter’s device is connecting to the laptops, smartphones, and tablets of cafe visitors.\r\n\r\nOn his screen, phrases like “iPhone Joris” and “Simone’s MacBook” start to appear. The device’s antenna is intercepting the signals that are being sent from the laptops, smartphones, and tablets around us.\r\n\r\nMore text starts to appear on the screen. We are able to see which WiFi networks the devices were previously connected to. Sometimes the names of the networks are composed of mostly numbers and random letters, making it hard to trace them to a definite location, but more often than not, these WiFi networks give away the place they belong to.\r\n\r\nWe learn that Joris had previously visited McDonald’s, probably spent his vacation in Spain (lots of Spanish-language network names), and had been kart-racing (he had connected to a network belonging to a well-known local kart-racing center). Martin, another café visitor, had been logged on to the network of Heathrow airport and the American airline Southwest. In Amsterdam, he’s probably staying at the White Tulip Hostel. He had also paid a visit to a coffee shop called The Bulldog.', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\7e35065f-5118-4c9a-bfc6-bdd14436c46b.png', 2, 'Technology', '2024-05-10 05:49:00.559216', NULL, 0, 0, 0),
(5, 'Apps I Use And Why You Should Too.', 'I start my day with Artifact, which is kind of like TikTok but for news. Kevin Systrom, who helped create Instagram, is behind this app. What I love about Artifact is how it uses AI to figure out the news I’m interested in and shows me more of that stuff. There’s also this neat feature where the AI can summarise articles. This way, I get the gist of a story without having to read the whole thing. The coolest part? If there’s a news headline that seems clickbaity, Artifact actually checks out the article and fixes the headline to be more accurate. No more falling for clickbait headlines!', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\5c618bd9-342f-4c84-9a07-87e272eafa01.png', 2, 'Technology', '2024-05-10 05:50:05.389437', NULL, 0, 0, 0),
(6, 'How Does Reading Affect Your Brain', 'Whenever you read a book or have a conversation, the experience causes physical changes in your brain.— George Johnson\r\n\r\nI love to read.\r\n\r\nI fell in love at a time I don’t even remember.\r\n\r\nI grew up in a tiny remote village where most people were farmers, and 99% of the farmers never went to school.\r\n\r\nMy father somehow did some schooling and joined the police force. I was lucky that he used to read a lot, pretty much all the time.\r\n\r\nHe loved fiction. However, he never encouraged me to read what he used to read but always encouraged me to read textbooks.\r\n\r\nSometimes, I used to keep his novel inside a textbook to enjoy the taste of a story. Fiction has the power to take you anywhere, and if the writer is good at storytelling, you feel like you are one of the characters.\r\n\r\nThe second most important reason I love reading is my physical structure. Yes, you are right, my physique. I used to be skinny and tall at a very young age.\r\n\r\nAs you may know, farming in underdeveloped countries is a physically demanding job. Therefore, in the early sage, I forced myself to study; to study more, you must read more.\r\n\r\nThe rest is history. Now, I have a flexible budget to buy books.\r\n\r\nIn fact, I have more books than I read in my lifespan.\r\n\r\nI used to think that if I bought a book and I didn’t read it, it was a waste of time.\r\n\r\nI don’t believe that way anymore; now I buy books if I like the author, book title, and especially the topic if I am working on the subject.\r\n\r\nYou know learning should not stop. I truly believe continuous learning is the only way to grow.\r\n\r\nAnyway, that’s enough background on how I fell in love with reading. It’s time to explore and justify the title — how reading has the power to change your brain.\r\n\r\nIt’s so intuitive that before we began reading, we looked at all of the shapes and patterns on the page.\r\n\r\nAfter that, the back of the brain receives these images and processes them in the same way as any other.\r\n\r\nThey proceed to the temporal lobe next.', 0, 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/blogs\\d49c0cd1-c5b1-45aa-ba4c-99395f46f3b6.png', 2, '0', '2024-05-10 05:51:46.053837', NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `OTP` int(11) NOT NULL,
  `Expiry` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `codes`
--

INSERT INTO `codes` (`id`, `UserId`, `OTP`, `Expiry`) VALUES
(1, 1, 3995, '2024-05-10 06:45:32.185496'),
(2, 1, 1265, '2024-05-10 06:46:08.255157'),
(3, 2, 7958, '2024-05-10 06:46:56.759397'),
(4, 1, 5713, '2024-05-10 06:48:37.758404'),
(5, 1, 8450, '2024-05-10 06:48:46.062411'),
(6, 1, 1071, '2024-05-10 06:49:34.000993'),
(7, 1, 3303, '2024-05-10 06:50:52.997924'),
(8, 1, 9469, '2024-05-12 00:13:39.236759'),
(9, 1, 9079, '2024-05-12 00:14:02.059399');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `BlogId` int(11) NOT NULL,
  `Text` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `IsEdited` tinyint(1) NOT NULL,
  `Score` int(11) NOT NULL,
  `UpVoteCount` int(11) NOT NULL,
  `DownVoteCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`Id`, `UserId`, `BlogId`, `Text`, `CreatedAt`, `UpdatedAt`, `IsEdited`, `Score`, `UpVoteCount`, `DownVoteCount`) VALUES
(1, 4, 2, 'Nice information. Very Useful', '2024-05-10 06:15:28.401616', '2024-05-10 06:17:24.370434', 1, -1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `Id` int(11) NOT NULL,
  `CommentId` int(11) NOT NULL,
  `Text` longtext NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`Id`, `CommentId`, `Text`, `UpdatedAt`) VALUES
(1, 1, 'Nice information', '2024-05-10 06:17:24.367277');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `Id` int(11) NOT NULL,
  `NotificationMsg` longtext NOT NULL,
  `UserId` int(11) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `IsViewed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`Id`, `NotificationMsg`, `UserId`, `CreatedOn`, `IsViewed`) VALUES
(1, 'Bhupendra Neupane has Liked on your blog.', 1, '2024-05-10 06:14:33.713994', 0),
(2, 'Bhupendra Neupane has commented on your blog.', 1, '2024-05-10 06:15:28.402090', 0),
(3, 'Sudip has Liked on your blog.', 4, '2024-05-10 06:24:57.972208', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `CommentId` int(11) NOT NULL,
  `IsUpVote` tinyint(1) DEFAULT NULL,
  `IsDownVote` tinyint(1) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`Id`, `UserId`, `CommentId`, `IsUpVote`, `IsDownVote`, `CreatedAt`) VALUES
(1, 4, 1, 0, 1, '2024-05-10 06:15:55.502801');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `Phone` longtext NOT NULL,
  `ImagePath` longtext NOT NULL,
  `role` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `Password`, `Phone`, `ImagePath`, `role`) VALUES
(1, 'Sudip', 'sudip.bbssm@gmail.com', '9d79f52fee344d4c78bebb4ee5f6e6cb3a5ae262669b9c89a9d79bcd424d449a', '9817000000', 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/users\\306cc6e2-2f44-4886-8117-8e9fa4517b83.jpg', 'Admin'),
(2, 'Anukul', 'anukulkarki11@gmail.com', '9d79f52fee344d4c78bebb4ee5f6e6cb3a5ae262669b9c89a9d79bcd424d449a', '9852000000', 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/users\\58cf3498-4aa4-47d4-b931-43a32ae7ff59.jpg', 'User'),
(3, 'ABS3 Blog', 'abs3blog.np@gmail.com', '9d79f52fee344d4c78bebb4ee5f6e6cb3a5ae262669b9c89a9d79bcd424d449a', '9863636363', 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/users\\bbe7637a-9f1a-4326-a08e-2af90ee5c770.png', 'Admin'),
(4, 'Bhupendra Neupane', 'bhupendraneupane08@gmail.com', 'dd2705060ca8ca0d5f912399fb3404284500ae2bfdc651643dab580ece6b7687', '9800000001', 'C:\\Users\\Acer\\OneDrive\\Desktop\\ABS3\\ABS3\\ABS3\\wwwroot\\uploads/users\\73595fcb-7963-43e8-baac-ffb3e1340de8.jpg', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240509225135_init', '8.0.4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bloghistories`
--
ALTER TABLE `bloghistories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BlogHistories_BlogId` (`BlogId`);

--
-- Indexes for table `blogreactions`
--
ALTER TABLE `blogreactions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_BlogReactions_BlogId` (`BlogId`),
  ADD KEY `IX_BlogReactions_UserId` (`UserId`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Blogs_UserId` (`UserId`);

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_Codes_UserId` (`UserId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Comments_BlogId` (`BlogId`),
  ADD KEY `IX_Comments_UserId` (`UserId`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Histories_CommentId` (`CommentId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Notifications_UserId` (`UserId`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Reactions_CommentId` (`CommentId`),
  ADD KEY `IX_Reactions_UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bloghistories`
--
ALTER TABLE `bloghistories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blogreactions`
--
ALTER TABLE `blogreactions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bloghistories`
--
ALTER TABLE `bloghistories`
  ADD CONSTRAINT `FK_BlogHistories_Blogs_BlogId` FOREIGN KEY (`BlogId`) REFERENCES `blogs` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `blogreactions`
--
ALTER TABLE `blogreactions`
  ADD CONSTRAINT `FK_BlogReactions_Blogs_BlogId` FOREIGN KEY (`BlogId`) REFERENCES `blogs` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BlogReactions_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `FK_Blogs_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `codes`
--
ALTER TABLE `codes`
  ADD CONSTRAINT `FK_Codes_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_Comments_Blogs_BlogId` FOREIGN KEY (`BlogId`) REFERENCES `blogs` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Comments_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `FK_Histories_Comments_CommentId` FOREIGN KEY (`CommentId`) REFERENCES `comments` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK_Notifications_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `FK_Reactions_Comments_CommentId` FOREIGN KEY (`CommentId`) REFERENCES `comments` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Reactions_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
