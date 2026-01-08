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
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKf5l871r0yr9dyilb3ls5p48os` (`user_id`),
  CONSTRAINT `FK57etajxuwl1com1sb8q3r3sgn` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Satellite','Ahmedabad','nisha.patel@gmail.com','Nisha','Patel','+91-9222333444',3),(2,'Jayanagar 4th Block','Bangalore','arun.rao@gmail.com','Arun','Rao','+91-9876543210',4),(3,'Village Wada','Pune','sunita.patil@gmail.com','Sunita','Patil','+91-9988776655',5),(4,'Hauz Khas','Delhi','vikram.m@gmail.com','Vikram','Malhotra','+91-9811223344',6),(5,'Marine Drive','Kochi','meera.nair@gmail.com','Meera','Nair','+91-9776655443',7),(6,'Rural District','Jaipur','rajesh.gupta@gmail.com','Rajesh','Gupta','+91-9898989898',8),(7,'Bandra West','Mumbai','sana.khan@gmail.com','Sana','Khan','+91-9000888777',9),(8,'Civil Lines','Allahabad','amitabh.singh@gmail.com','Amitabh','Singh','+91-9555444333',10),(9,'Salt Lake','Kolkata','divya.desai@gmail.com','Divya','Desai','+91-9222333444',11),(10,'Rural Zone','Coimbatore','karthik.iyer@gmail.com','Karthik','Iyer','+91-9444555666',12),(11,'Indiranagar','Lucknow','neha.kapoor@gmail.com','Neha','Kapoor','+91-9123456789',13),(12,'Sector 17','Chandigarh','rahul.verma@gmail.com','Rahul','Verma','+91-9666777888',14),(13,'Navrangpura','Ahmedabad','anjali.mehta@gmail.com','Anjali','Mehta','+91-9870098700',15),(14,'Rural District','Nagpur','mohan.das@gmail.com','Mohan','Das','+91-9777888999',16),(15,'Banjara Hills','Hyderabad','sneha.reddy@gmail.com','Sneha','Reddy','+91-9999000111',17),(16,'Koramangala','Bangalore','varun.joshi@gmail.com','Varun','Joshi','+91-9888777666',18),(17,'Bagalkot Road','Hubli','gopal.hegde@gmail.com','Gopal','Hegde','+91-9844002233',19),(18,'Temple Street','Mysore','lakshmi.n@gmail.com','Lakshmi','Narayan','+91-9900112233',20),(19,'Salt Lake Sector 5','Kolkata','riya.sen@gmail.com','Riya','Sen','+91-9111222333',21),(20,'Mall Road','Shimla','pratap.singh@gmail.com','Col. Pratap','Singh','+91-9876598765',22),(21,'Koregaon Park','Pune','tanya.bhatia@gmail.com','Tanya','Bhatia','+91-9222111000',23),(22,'Dadar','Mumbai','rohan.g@gmail.com','Rohan','Gavaskar','+91-9090909090',24),(23,'Rural Zone','Bikaner','balram.y@gmail.com','Balram','Yadav','+91-9550066000',25),(24,'Defence Colony','Delhi','sameer.khan@gmail.com','Sameer','Khan','+91-9899887766',26),(25,'Rural District','Alwar','ashok.meena@gmail.com','Ashok','Meena','+91-9444333222',27),(26,'Gomti Nagar','Lucknow','priya.saxena@gmail.com','Priya','Saxena','+91-9777666555',28),(27,'Juhu','Mumbai','vivek.oberoi@gmail.com','Vivek','Oberoi','+91-9333444555',29),(28,'Panjim','Goa','sarah.f@gmail.com','Sarah','Fernandes','+91-9988001122',30),(29,'Manali','Manali','arjun.rampal@gmail.com','Arjun','Rampal','+91-9123123123',31),(30,'Rural District','Nanded','suresh.gowda@gmail.com','Suresh','Gowda','+91-9666555444',32),(31,'T Nagar','Chennai','kavita.k@gmail.com','Kavita','Krishnan','+91-9876543210',33),(32,'Rural District','Madurai','muthu.velu@gmail.com','Muthu','Velu','+91-9000111222',34),(33,'Sector 44','Noida','deepak.c@gmail.com','Deepak','Chopra','+91-9555666777',35),(34,'Satellite','Ahmedabad','nisha.rao@gmail.com','Nisha','Rao','+91-9933224455',36);
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-08 11:27:11
