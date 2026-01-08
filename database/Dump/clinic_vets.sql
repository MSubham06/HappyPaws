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
-- Table structure for table `vets`
--

DROP TABLE IF EXISTS `vets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `consultation_fee` decimal(38,2) DEFAULT NULL,
  `emergency_available` bit(1) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `years_of_experience` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vets`
--

LOCK TABLES `vets` WRITE;
/*!40000 ALTER TABLE `vets` DISABLE KEYS */;
INSERT INTO `vets` VALUES (1,'Ramesh','Kumar','9876500011','Canine Medicine & Surgery',600.00,_binary '','MALE','BVSc & AH',10),(2,'Anita','Sharma','9876500012','Dog Dermatology & Allergies',500.00,_binary '\0','FEMALE','MVSc (Veterinary Dermatology)',7),(3,'Vikram','Singh','9876500013','Orthopedic & Joint Disorders (Dogs)',700.00,_binary '','MALE','MVSc (Surgery)',12),(4,'Sneha','Iyer','9876500021','Feline Medicine',550.00,_binary '\0','FEMALE','BVSc',6),(5,'Arjun','Mehta','9876500022','Cat Respiratory & Asthma Care',650.00,_binary '','MALE','MVSc (Clinical Medicine)',9),(6,'Neelam','Joshi','9876500023','Feline Nutrition & Obesity',500.00,_binary '\0','FEMALE','BVSc & AH',5),(7,'Mahesh','Patil','9876500031','Dairy & Cattle Health',800.00,_binary '','MALE','MVSc (Animal Husbandry)',15),(8,'Savitri','Deshmukh','9876500032','Mastitis & Milk Yield Disorders',750.00,_binary '','FEMALE','MVSc (Veterinary Gynaecology)',13),(9,'Raghav','Rao','9876500033','Large Animal Surgery',900.00,_binary '','MALE','MVSc (Surgery)',18),(10,'Kiran','Naik','9876500041','Goat Medicine & Parasite Control',450.00,_binary '\0','MALE','BVSc',6),(11,'Pooja','Kulkarni','9876500042','Breeding & Reproductive Health (Goats)',500.00,_binary '\0','FEMALE','MVSc (Gynaecology)',8),(12,'Suresh','Yadav','9876500043','Rural Livestock Diseases',550.00,_binary '','MALE','BVSc & AH',11),(13,'Nikhil','Bansal','9876500051','Small Mammal Medicine (Rabbits)',400.00,_binary '\0','MALE','BVSc',4),(14,'Ayesha','Khan','9876500052','Rabbit Dental & Digestive Care',450.00,_binary '\0','FEMALE','MVSc (Exotic Animals)',6),(15,'Ritu','Malhotra','9876500053','Exotic Pet Nutrition',350.00,_binary '\0','FEMALE','BVSc',5),(16,'Prakash','Nair','9876500061','Avian Medicine',500.00,_binary '\0','MALE','MVSc (Avian Science)',9),(17,'Divya','Menon','9876500062','Bird Nutrition & Feather Disorders',450.00,_binary '\0','FEMALE','BVSc',7),(18,'Sanjay','Kulkarni','9876500063','Exotic & Companion Birds',600.00,_binary '','MALE','MVSc (Exotic Medicine)',11);
/*!40000 ALTER TABLE `vets` ENABLE KEYS */;
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
