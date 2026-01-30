-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: clinic
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `time` time(6) NOT NULL,
  `owner_id` bigint NOT NULL,
  `pet_id` bigint NOT NULL,
  `vet_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKculhi6hbol88vcfvgyw5qulxx` (`owner_id`),
  KEY `FK62dl3dvwsbveq3vv067becwmj` (`pet_id`),
  KEY `FKij3s37eghwey25hfo6d7xwky6` (`vet_id`),
  CONSTRAINT `FK62dl3dvwsbveq3vv067becwmj` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`),
  CONSTRAINT `FKculhi6hbol88vcfvgyw5qulxx` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`),
  CONSTRAINT `FKij3s37eghwey25hfo6d7xwky6` FOREIGN KEY (`vet_id`) REFERENCES `vets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2026-02-23','General Checkup','CONFIRMED','11:00:00.000000',33,89,1),(2,'2026-03-02','General Checkup','CONFIRMED','10:00:00.000000',1,2,1),(3,'2026-01-24','Emergency','CONFIRMED','09:00:00.000000',1,1,1),(5,'2026-02-07','Vaccination','CONFIRMED','09:00:00.000000',1,2,1),(6,'2026-01-28','Emergency','CONFIRMED','15:00:00.000000',1,1,1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-30 12:26:45
