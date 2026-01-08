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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `related_entity_id` bigint DEFAULT NULL,
  `role` enum('ADMIN','OWNER','VET') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@happypaws.com','$2a$10$IKdv7C31G2FEsFCPtrLTderlYQ9lszmJaGxoL8uezfoELr9/fgH8q',NULL,'ADMIN'),(2,'new.owner@gmail.com','$2a$10$b3LS/erFWveZs5XxOfmSeOLYCDm7aQ5di4lGpD2KgW8VasOeirIcy',NULL,'OWNER'),(3,'nisha.patel@gmail.com','$2a$10$VbmR0ev3k/.6WABuhsC7E.dfcRfmf2/ZNmbrJX0Ym.UWeSBPHW4bS',NULL,'OWNER'),(4,'arun.rao@gmail.com','$2a$10$L5vYcd53x388Xh.Mr9yXtO3Ie4kAtPuDC4om6YMN9vDNZ6/zZq7C2',NULL,'OWNER'),(5,'sunita.patil@gmail.com','$2a$10$/S.S4W2VX18KgLQIM8mYAeQz047v5aitgfxHxOAlJITGfmkqoMyGS',NULL,'OWNER'),(6,'vikram.m@gmail.com','$2a$10$8Igi7zMzDzIwhhy8Z9EDPeFpQYvS1U5hEHGuZqeh/TtcpD1YqGLwm',NULL,'OWNER'),(7,'meera.nair@gmail.com','$2a$10$qZaqYu0b2oh01QXyCSU1O.MkmVND7WeJrMemwCSvAhnZlAAXl.oMC',NULL,'OWNER'),(8,'rajesh.gupta@gmail.com','$2a$10$weC6QLooWxov60dBjq60HuO6No3fL/Esok38Cewq4vnzQLgLwWdwa',NULL,'OWNER'),(9,'sana.khan@gmail.com','$2a$10$c6RrjUSFnL1i/Zs2zJGf5.Grw5ak3aTSzskHChB9ZybJgjXDaJequ',NULL,'OWNER'),(10,'amitabh.singh@gmail.com','$2a$10$uKkx9J9kaeuWFqBuEMAzAuKn6/A4lvgvh8B9Xrt6wgmGUpOtGLZBO',NULL,'OWNER'),(11,'divya.desai@gmail.com','$2a$10$Hkylke0A6Pn6UaH8Accd.uTWUeoDKJ2GAVRzWMnLPtm9J.9MiWRWG',NULL,'OWNER'),(12,'karthik.iyer@gmail.com','$2a$10$ZsZiOSrOxag2/6v76fiPyuGrd84v1CDatFjOUU04G59Z0i2x1Wjuu',NULL,'OWNER'),(13,'neha.kapoor@gmail.com','$2a$10$c2ATpiZKGC1JCYx3CEqDqur/f0yAfzPNQI6tuUlTHMwamgGMQWy1G',NULL,'OWNER'),(14,'rahul.verma@gmail.com','$2a$10$eTHx7U91Xxsl6iA2Gml8x.m9gUJA5zfaNYDpenufcYxQJVowq/kT2',NULL,'OWNER'),(15,'anjali.mehta@gmail.com','$2a$10$jfidhSxkmxc3sGS2Gr32du2W5tsFwhSYDtc3gewBMHygqSgfVRs62',NULL,'OWNER'),(16,'mohan.das@gmail.com','$2a$10$91XJx38GGgt/2nmz5HSXv.ELTDvvxqNjl1n4.kcEY.zRz8Ld3uZki',NULL,'OWNER'),(17,'sneha.reddy@gmail.com','$2a$10$TrtOj.z1g63/LbXr8A4Vd.H5V6ozVlUyoHj8JGjwBro5XeWWo59RW',NULL,'OWNER'),(18,'varun.joshi@gmail.com','$2a$10$sOtOkw7SfDblyKvEORN3w.2/f2SaRo60GAsQo6QniTTgvywx0HaOy',NULL,'OWNER'),(19,'gopal.hegde@gmail.com','$2a$10$1mbkktju7g4jmZQGsvdTm.PDk4/QJKHgbTqfd/oxFIqJJCLvZ4Pb.',NULL,'OWNER'),(20,'lakshmi.n@gmail.com','$2a$10$2t/GOQKLKqtoQ/vHqCxo.ut9Yu2JCYGCEXcT/71xTxga27n67ZT0q',NULL,'OWNER'),(21,'riya.sen@gmail.com','$2a$10$LCoyPEGMYMm5tw/dGPYMH.f4qz8qOzkQCB97QZcz3NnA4ukrgBuWe',NULL,'OWNER'),(22,'pratap.singh@gmail.com','$2a$10$4hXTyqBlahV4g1K5SoGlBeVg8NDJ7xn/ASnTFs1hBdY118u6R/6na',NULL,'OWNER'),(23,'tanya.bhatia@gmail.com','$2a$10$doI7FBwFV6IfkHd4TlALNeHed6P/1FZDs.jc5PZa//lmZ/Qe60ODS',NULL,'OWNER'),(24,'rohan.g@gmail.com','$2a$10$fgLL4DYVjWhCeZfU4rd2GeRW2yzpDvWNhcSQTiUDkFkVJZBTTJbU2',NULL,'OWNER'),(25,'balram.y@gmail.com','$2a$10$2eFNYUx4jYNwCvLpvsIoKuyulhDWKXrOBcGAzKNLTObn9dUJ6owsq',NULL,'OWNER'),(26,'sameer.khan@gmail.com','$2a$10$dW0NsrVkhBMstKAVs/fdqubovSCwcCN8j9SldehZ0nq2SMqzmI0Wi',NULL,'OWNER'),(27,'ashok.meena@gmail.com','$2a$10$WyFBMabSVHJ49E4WeAsHNuVkBAFfa5JqhxySeKnGl73bzFCDWLsrm',NULL,'OWNER'),(28,'priya.saxena@gmail.com','$2a$10$DmmhSHWSdG5pQxYwoaq57eWeSpGrvFPAKwVuyvD9MFhvz31fZ8dAm',NULL,'OWNER'),(29,'vivek.oberoi@gmail.com','$2a$10$IUtxCx0k93ivBw2eHTe6ZOkr.BYKCTxNn7LW8Q2xEQb73AaKcsl7u',NULL,'OWNER'),(30,'sarah.f@gmail.com','$2a$10$OdLVIryJ1ciBHLqdVJCEq.SQ.BCAftxDwbkIpXFZi.BUaQR615fXW',NULL,'OWNER'),(31,'arjun.rampal@gmail.comm','$2a$10$XPtiMAOMHWxRZfCItsB3peQDxd3ASOnGU50fiMfLnX/ABokdxTxz2',NULL,'OWNER'),(32,'suresh.gowda@gmail.com','$2a$10$yoFsU920DK2krUXJMvqAm.j4KTF/Gq9SpvJmO9SKuAYIEwsTC1I5G',NULL,'OWNER'),(33,'kavita.k@gmail.com','$2a$10$smGMVTdPi4T5YtExb/k/2OInyKAra.WM8Wus/3eHUzAXoq5hjXNqa',NULL,'OWNER'),(34,'muthu.velu@gmail.com','$2a$10$h5xALl8RptEsMpJmAyOw/.Pv.oE8NXmDWUHoYQdk4PPEG8KEhwEH.',NULL,'OWNER'),(35,'deepak.c@gmail.com','$2a$10$dZ/CVJNeHV1rZL6VSkoRxernVoXmsIIRRhBeLEfeUvoHcMmKoEzKC',NULL,'OWNER'),(36,'nisha.rao@gmail.com','$2a$10$ElAu3Rty5K14td7Rc8j8RudHuc48zs34gECXOhGIeTrhplB2LDe.i',NULL,'OWNER'),(37,'ramesh.kumar@happypaws.com','$2a$10$fvGcgO2j7Wwy8bXecYyufevRJm4ODCFWbtaGd/qkPxnLQnJcdOZmG',NULL,'VET'),(38,'anita.sharma@happypaws.com','$2a$10$YZvUshETjC/HEsrogcVUS.HopDiBN/j2rfWbTGQUEM0xlQS/LPPOi',NULL,'VET'),(39,'vikram.singh@happypaws.com','$2a$10$4WV6MtGEXI.pNIarHuTasuT9qiaeY28EZqpEZBQxX2QwCV4nbJkry',NULL,'VET'),(40,'sneha.iyer@happypaws.com','$2a$10$vlSZGOyU0oC5yByeiuJ0JekSwL7/0urSRIfz6.IwX4U2XMY948i8y',NULL,'VET'),(41,'arjun.mehta@happypaws.com','$2a$10$5mh.OaHjOqDgs1mFDFEXO.y2YwuOZiWOJVLwN1SwqdpOMM1JNc0xq',NULL,'VET'),(42,'neelam.joshi@happypaws.com','$2a$10$9WJ.rOAQSCRACvupdpaWFeRFqEYev7SGb/eyB5zYGGMgUQwOaLScO',NULL,'VET'),(43,'mahesh.patil@happypaws.com','$2a$10$KGzfTWC9VFe9u1z6JVdc..kUNpNZNY1sL7dLsxTCcUGtCKifvnsgK',NULL,'VET'),(44,'savitri.deshmukh@happypaws.com','$2a$10$fNW9cS7YLdZSU5.gy1PmyexETkCH9h6FqExOu.0dlwIkTcJ8R4n..',NULL,'VET'),(45,'raghav.rao@happypaws.com','$2a$10$VfdxW/Ho3EvESzoT0cNhoe.BiYb2XBb3X6fxfWKwpJfNLC1ql0Cam',NULL,'VET'),(46,'kiran.naik@happypaws.com','$2a$10$1Id866EdQqi4UEiDiBojwubzeYjCZh28ia9FXtYz3Mei3CclpsKQq',NULL,'VET'),(47,'pooja.kulkarni@happypaws.com','$2a$10$f0kvKdZMJkQvPSmAXH6/bOZ9x9hdvjjWFuytAOsbL7XuzVlSJc/Xm',NULL,'VET'),(48,'suresh.yadav@happypaws.com','$2a$10$uGlmTjE/SdSPE1JWMvuuX.MKrBs0cd/AgPoLQK31pzjHuyUxxUW2W',NULL,'VET'),(49,'nikhil.bansal@happypaws.com','$2a$10$nWgq7jkgMLVq2hfDe6r4AuydxilSoPwlPWjrCBOCb/2wOAfWLH.k6',NULL,'VET'),(50,'ayesha.khan@happypaws.com','$2a$10$iEMI7sAGOWgPB27oIE/OmOhr6ScTQbgXn0UYi.l1nyxl.Mczspll6',NULL,'VET'),(51,'ritu.malhotra@happypaws.com','$2a$10$.QvKAiZ7C54x/tgoxvGJtOxUpn3inLrFCQ28G0sXYdGwuhICt1xjW',NULL,'VET'),(52,'prakash.nair@happypaws.com','$2a$10$AzLhWmmxV7fiKkozWZnHfuOOf849/NrE/8TPLtWvztQfj6EVPh9p6',NULL,'VET'),(53,'divya.menon@happypaws.com','$2a$10$S9QkYCHkAiqgsyuHtXKACucZffgwpf3/5QN3bAubiQqXuwCPwrWT2',NULL,'VET'),(54,'sanjay.kulkarni@happypaws.com','$2a$10$xdmN7FCNvFUREc0bVWVdiurG8xzDv6AuBGiv01g7U9Tro0Iw3TU.S',NULL,'VET'),(55,'dr.amit@happypaws.com','$2a$10$lDaq6zuITkgvmZ8.ZQ7UgulsOjL8as4Sy/Yy.Y6G9ln93htaRnxUO',NULL,'VET');
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

-- Dump completed on 2026-01-08 11:27:13
