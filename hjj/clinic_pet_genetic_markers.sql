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
-- Table structure for table `pet_genetic_markers`
--

DROP TABLE IF EXISTS `pet_genetic_markers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_genetic_markers` (
  `pet_id` bigint NOT NULL,
  `genetic_markers` varchar(255) DEFAULT NULL,
  KEY `FKdgfrppqin4n5tfkuqqp2tsbxf` (`pet_id`),
  CONSTRAINT `FKdgfrppqin4n5tfkuqqp2tsbxf` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_genetic_markers`
--

LOCK TABLES `pet_genetic_markers` WRITE;
/*!40000 ALTER TABLE `pet_genetic_markers` DISABLE KEYS */;
INSERT INTO `pet_genetic_markers` VALUES (1,'Cardiac Risk'),(2,'Intelligent'),(4,'PKD Risk'),(5,'Obesity Prone'),(6,'High Milk Yield'),(11,'Hip Dysplasia Risk'),(15,'Heat Resistant'),(18,'Draft Power'),(21,'Loud Caller'),(23,'Obesity Prone'),(24,'Cardiac Risk'),(9,'Vocal mimicry'),(25,'Osteochondrodysplasia Risk'),(28,'Drought Resistant'),(29,'Disease Resistant'),(30,'Sighthound'),(33,'Loud'),(35,'Bloat Risk'),(39,'Agility'),(40,'Miniature'),(41,'Large Beak'),(44,'Spine Issues'),(45,'Folded Ears'),(46,'High Stamina'),(47,'Draft Power'),(48,'High Immunity'),(51,'Mimicry'),(53,'Joint Issues'),(54,'Thick Coat'),(56,'Hairless'),(57,'Brachycephalic'),(58,'Deafness Risk'),(60,'Heat Tolerance'),(61,'Disease Resistance'),(62,'Dual Purpose'),(63,'Speed'),(66,'High Milk Yield'),(67,'Wool Production'),(68,'Strong Draft'),(70,'Short Legs'),(71,'Singer'),(72,'Respiratory Issues'),(74,'Hypoallergenic'),(76,'Blue Eyes'),(78,'Pashmina Wool'),(79,'Disease Resistant'),(80,'Milk Yield'),(81,'Draft Power'),(83,'Flat Face'),(85,'Guard Dog'),(86,'Hardy'),(87,'Meat Breed'),(88,'Heart Issues'),(91,'Cardiac Risk'),(92,'Intelligent'),(95,'PKD');
/*!40000 ALTER TABLE `pet_genetic_markers` ENABLE KEYS */;
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
