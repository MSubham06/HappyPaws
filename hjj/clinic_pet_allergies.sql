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
-- Table structure for table `pet_allergies`
--

DROP TABLE IF EXISTS `pet_allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_allergies` (
  `pet_id` bigint NOT NULL,
  `allergies` varchar(255) DEFAULT NULL,
  KEY `FKca96vd4yuwe4hovochmbk94d0` (`pet_id`),
  CONSTRAINT `FKca96vd4yuwe4hovochmbk94d0` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_allergies`
--

LOCK TABLES `pet_allergies` WRITE;
/*!40000 ALTER TABLE `pet_allergies` DISABLE KEYS */;
INSERT INTO `pet_allergies` VALUES (1,'None'),(2,'Chocolate'),(3,'None'),(4,'Fish'),(5,'Wheat'),(6,'None'),(7,'None'),(8,'None'),(11,'Chicken'),(12,'Grains'),(13,'Dairy'),(14,'None'),(15,'None'),(16,'None'),(17,'None'),(18,'None'),(19,'Chicken'),(19,'Beef'),(20,'Kale'),(21,'Chocolate'),(22,'Grains'),(23,'Soy'),(24,'None'),(10,'Iceberg Lettuce'),(9,'Avocado'),(25,'None'),(26,'Spinach'),(27,'None'),(28,'None'),(29,'None'),(30,'None'),(31,'None'),(32,'Chicken'),(33,'None'),(34,'Grains'),(35,'None'),(36,'None'),(37,'None'),(38,'None'),(39,'None'),(40,'None'),(41,'None'),(42,'None'),(43,'None'),(44,'Beef'),(45,'None'),(46,'None'),(47,'None'),(48,'None'),(49,'None'),(50,'Fish'),(51,'None'),(52,'Carrots (excess)'),(53,'None'),(54,'Grains'),(55,'Avocado'),(56,'None'),(57,'Chicken'),(58,'Organ Meats'),(59,'None'),(60,'None'),(61,'None'),(62,'None'),(63,'None'),(64,'None'),(65,'Chicken'),(66,'None'),(67,'None'),(68,'None'),(69,'None'),(70,'None'),(71,'None'),(72,'Grains'),(73,'None'),(74,'Chicken'),(75,'None'),(76,'None'),(77,'None'),(78,'None'),(79,'None'),(80,'None'),(81,'None'),(82,'Chicken'),(83,'None'),(84,'None'),(85,'None'),(86,'None'),(87,'None'),(88,'Wheat'),(89,'None'),(90,'None'),(91,'None'),(92,'Chocolate'),(93,'None'),(94,'None'),(95,'Fish');
/*!40000 ALTER TABLE `pet_allergies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-06 16:16:26
