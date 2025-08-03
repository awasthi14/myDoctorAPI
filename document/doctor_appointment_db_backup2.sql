-- MySQL dump 10.13  Distrib 8.4.4, for Win64 (x86_64)
--
-- Host: localhost    Database: doctor_appointment_db
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `time_slot` varchar(20) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `appointment_time` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (5,1,6,'2025-08-09','09:00-10:00','PENDING','2025-08-01 06:42:36','09:00-10:00'),(6,1,6,'2025-08-09','09:00-10:00','PENDING','2025-08-01 06:50:59','09:00-10:00'),(7,1,6,'2025-08-09','09:00-10:00','PENDING','2025-08-01 06:55:00','09:00-10:00'),(8,1,6,'2025-08-09','09:00-10:00','PENDING','2025-08-01 07:35:49','09:00-10:00'),(9,1,6,'2025-08-05','11','PENDING','2025-08-01 15:01:07','11'),(10,2,6,'2025-08-08','02','PENDING','2025-08-01 15:04:39','02'),(11,3,6,'2025-08-07','02','PENDING','2025-08-01 15:05:44','02'),(12,3,6,'2025-08-08','2:00','PENDING','2025-08-01 15:14:32','2:00'),(13,1,6,'2025-08-15','12:00','PENDING','2025-08-03 15:35:03','12:00'),(14,2,2,'2025-08-09','09:00-10:00','PENDING','2025-08-03 16:31:48','09:00-10:00'),(15,5,6,'2025-08-10','10:00-11:00','PENDING','2025-08-03 16:41:29','10:00-11:00');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `available_date` date NOT NULL,
  `time_slot` varchar(20) NOT NULL,
  `is_booked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (1,1,'2025-08-01','09:00-10:00',0),(2,1,'2025-08-01','10:00-11:00',0),(3,2,'2025-08-02','14:00-15:00',0),(4,2,'2025-08-02','15:00-16:00',0),(5,3,'2025-08-03','11:00-12:00',0),(6,3,'2025-08-03','12:00-13:00',0);
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `specialization` varchar(100) NOT NULL,
  `bio` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,3,'Cardiologist','Experienced in adult and pediatric cardiology.'),(2,4,'Psychiatrist','Skin care expert with 10+ years of practice.'),(3,5,'Neurologist','Specialist in brain and nervous system disorders.'),(5,2,'Physician','Physician'),(6,13,'General','Experienced in the medical field.');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `age` int NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,7,20),(2,8,20),(3,9,20),(4,10,20),(6,1,20),(7,14,22),(8,15,23);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('PATIENT','DOCTOR','ADMIN') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ankit Awasthi','ankit@gmail.com','$2b$10$dg827XzWxKAGXWwsUljZzOewf.zRMeDXole5j5B0ChidfH9MnNL72','PATIENT','1234567890','2025-07-30 16:49:15'),(2,'Arpit Awasthi','arpit@gmail.com','$2b$10$ODfncRo6TjOATx./H3HYHuNbqk5d7z2/kRSzFeqcs/fm66oV7a18u','DOCTOR','9876543210','2025-07-31 16:25:09'),(3,'Dr. Arpit Alice Smith','alice.smith@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','DOCTOR','1234567890','2025-07-31 16:57:02'),(4,'Dr. Karen Gill','karen.gill@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','DOCTOR','2345678901','2025-07-31 16:57:02'),(5,'Dr. Clara Davis','clara.davis@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','DOCTOR','3456789012','2025-07-31 16:57:02'),(6,'Dr. Daniel Lee','daniel.lee@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','DOCTOR','4567890123','2025-07-31 16:57:02'),(7,'John Carter - Arpit','john.carter@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','9876543210','2025-08-01 06:18:27'),(8,'Emily Clark','emily.clark@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','8765432109','2025-08-01 06:18:27'),(9,'Michael Brown','michael.brown@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','7654321098','2025-08-01 06:18:27'),(10,'Sophia Turner','sophia.turner@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','6543210987','2025-08-01 06:18:27'),(11,'Liam Wilson','liam.wilson@example.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','5432109876','2025-08-01 06:18:27'),(12,'Arun Awasthi','arun@gmail.com','$2b$10$SxKrtypfSDRHSx9cm4IVhuOzctM4iYC0bNG7P.mGcvEwYS5nc83na','ADMIN','9876543210','2025-08-03 11:37:46'),(13,'Adhyayan Awasthi','adhyayan@gmail.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','DOCTOR','9999999999','2025-08-03 17:06:26'),(14,'Rahul','rahul@gmail.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','8888888888','2025-08-03 17:14:21'),(15,'raj','raj@gmail.com','$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy','PATIENT','8888888888','2025-08-03 17:17:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-03 22:49:03
