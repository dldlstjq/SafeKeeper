-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: database-1.cegouvbq3wxp.us-east-2.rds.amazonaws.com    Database: safetykeeper
-- ------------------------------------------------------
-- Server version	8.0.27

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `accident`
--

DROP TABLE IF EXISTS `accident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accident` (
  `accident_id` bigint NOT NULL AUTO_INCREMENT,
  `accident_date` datetime(6) NOT NULL,
  `accident_description` varchar(255) DEFAULT NULL,
  `accident_picture` varchar(255) DEFAULT NULL,
  `accident_type` varchar(255) DEFAULT NULL,
  `camera_id` bigint DEFAULT NULL,
  PRIMARY KEY (`accident_id`),
  KEY `FK5yr1bwpoaqg5s8tk577uvqxbw` (`camera_id`),
  CONSTRAINT `FK5yr1bwpoaqg5s8tk577uvqxbw` FOREIGN KEY (`camera_id`) REFERENCES `camera` (`camera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accident`
--

LOCK TABLES `accident` WRITE;
/*!40000 ALTER TABLE `accident` DISABLE KEYS */;
INSERT INTO `accident` VALUES (3,'2022-04-07 11:11:30.954000','string','string','string',1),(4,'2022-04-07 11:16:39.022000','사진 설명','string','안전모 미착용',1),(5,'2022-04-07 11:29:42.025000','사진 설명','string','안전모 미착용',1),(6,'2022-04-07 11:30:19.006000','사진 설명','string','안전모 미착용',1),(7,'2022-04-07 11:32:12.129000','사진 설명','string','안전모 미착용',1),(8,'2022-04-07 13:40:46.014000','사진 설명','string','안전모 미착용',1),(9,'2022-04-07 14:35:51.010000','사진 설명','string','안전모 미착용',1),(10,'2022-04-07 14:38:13.013000','사진 설명','string','안전모 미착용',1),(11,'2022-04-07 14:39:45.961000','사진 설명','string','안전모 미착용',1),(12,'2022-04-07 14:39:49.016000','사진 설명','string','안전모 미착용',1),(13,'2022-04-07 14:40:24.017000','사진 설명','string','안전모 미착용',1),(14,'2022-04-07 14:40:26.227000','사진 설명','string','안전모 미착용',1),(16,'2022-04-07 15:46:25.015000','사진 설명','string','안전모 미착용',1),(17,'2022-04-07 16:46:43.020000','사진 설명','string','안전모 미착용',1),(18,'2022-04-07 16:47:28.007000','사진 설명','string','안전모 미착용',1),(19,'2022-04-07 16:47:55.048000','사진 설명','string','안전모 미착용',1),(20,'2022-04-07 16:49:17.016000','사진 설명','string','안전모 미착용',1),(21,'2022-04-07 16:50:02.003000','사진 설명','string','안전모 미착용',1),(22,'2022-04-07 16:50:23.007000','사진 설명','string','안전모 미착용',1),(23,'2022-04-07 16:50:45.031000','사진 설명','string','안전모 미착용',1),(24,'2022-04-07 16:51:15.024000','사진 설명','string','안전모 미착용',1),(25,'2022-04-07 16:51:48.020000','사진 설명','string','안전모 미착용',1),(26,'2022-04-07 16:55:08.005000','사진 설명','string','안전모 미착용',1),(27,'2022-04-07 17:13:10.247000','사진 설명','string','안전모 미착용',1),(28,'2022-04-07 17:13:26.014000','사진 설명','string','안전모 미착용',1),(29,'2022-04-07 17:28:56.019000','사진 설명','string','안전모 미착용',1),(30,'2022-04-07 17:32:41.031000','사진 설명','string','안전모 미착용',1),(31,'2022-04-07 17:51:44.011000','사진 설명','string','안전모 미착용',9);
/*!40000 ALTER TABLE `accident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camera`
--

DROP TABLE IF EXISTS `camera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camera` (
  `camera_id` bigint NOT NULL AUTO_INCREMENT,
  `camera_place` varchar(255) NOT NULL,
  `construction_id` bigint NOT NULL,
  `room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`camera_id`),
  KEY `FKkx5hi1v3uubw1jc2o0yfixy13` (`construction_id`),
  KEY `FKprrfix25piyu9rqtcaio5h1n6` (`room_id`),
  CONSTRAINT `FKkx5hi1v3uubw1jc2o0yfixy13` FOREIGN KEY (`construction_id`) REFERENCES `construction` (`construction_id`),
  CONSTRAINT `FKprrfix25piyu9rqtcaio5h1n6` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camera`
--

LOCK TABLES `camera` WRITE;
/*!40000 ALTER TABLE `camera` DISABLE KEYS */;
INSERT INTO `camera` VALUES (1,'1층',1,1),(8,'1층',24,NULL),(9,'1층',25,NULL);
/*!40000 ALTER TABLE `camera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction`
--

DROP TABLE IF EXISTS `construction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `construction` (
  `construction_id` bigint NOT NULL AUTO_INCREMENT,
  `construction_name` varchar(255) NOT NULL,
  PRIMARY KEY (`construction_id`),
  UNIQUE KEY `construction_name` (`construction_name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction`
--

LOCK TABLES `construction` WRITE;
/*!40000 ALTER TABLE `construction` DISABLE KEYS */;
INSERT INTO `construction` VALUES (24,'constTest'),(21,'doosan'),(2,'google'),(22,'kakao'),(20,'naver'),(19,'netflix'),(1,'samsung'),(25,'test');
/*!40000 ALTER TABLE `construction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  `room_password` varchar(255) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'방1','$2a$10$UhuD3EOSEGZBUoZKGCLPieGNBHeVjuUrnYDvUuB1AklsR3YWL3q9e'),(2,'김감독','$2a$10$2a5nN.EgruhK3o2Y.YMIwexJW1skNgOV3oAjwvnxYNABvTbmopq..'),(3,'삼성','$2a$10$tQ2zPUCh9npZjTHfCtX8H.rXx.vVqAScA1Vtt37KArsjeqeOI/r0e'),(5,'123','$2a$10$ckpL1tfPOdlBUIN/jb7./elfCOyasrPdxwtM9DD.f9YL71WkQ4SH2'),(7,'fsdf','$2a$10$hj8iTkCK8lziox23RXT3TOFo1qjK/46kB3Hp4D94ORmyrFnWOUx8K'),(8,'z','$2a$10$CjHwkAiOOy42dIMIiuR1beX4EeQV38bAO7//J6jlNXV9RdmzeA02K'),(9,'z','$2a$10$DPMzEJjoR6NNYyw5MFB5muBVgCI42a7MH9r1Fhy7cHqwiozQaF5PW'),(10,'samsung','$2a$10$AYOSZ4V9EpBNW7P5TNLmyOexT2ShcxXOvQKOMgNDusXuQvCChAn9K'),(11,'방바라방','$2a$10$CkQ9ZxeCDnKA4B9h6ySVMeRH8rFCVy.q7Yi32j23vHEyzvkJ1V.bG'),(12,'test11','$2a$10$xe5ukbuUH8sssepSH9s3z.ewT1JbAaeoRTLB.iwSEFfvxUcB/dyfa');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_user`
--

DROP TABLE IF EXISTS `room_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtakjqllocgakgw0os4hygxfk1` (`room_id`),
  KEY `FK93pqtc1kyjxwoj26quvm5hugi` (`user_id`),
  CONSTRAINT `FK93pqtc1kyjxwoj26quvm5hugi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKtakjqllocgakgw0os4hygxfk1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_user`
--

LOCK TABLES `room_user` WRITE;
/*!40000 ALTER TABLE `room_user` DISABLE KEYS */;
INSERT INTO `room_user` VALUES (1,1,1),(3,3,4),(5,5,5),(8,8,2),(9,9,2),(10,10,15),(11,11,14),(12,12,17);
/*!40000 ALTER TABLE `room_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `construction_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `FKen2ukguk952gjh79wcxuj2ita` (`construction_id`),
  CONSTRAINT `FKen2ukguk952gjh79wcxuj2ita` FOREIGN KEY (`construction_id`) REFERENCES `construction` (`construction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ssafy','김싸피','$2a$10$.jUDO1QerlCg52a6uj4SyuRdkG6VyPmNCQXunPlQimrlN1XM1Pf4y','사장',1),(2,'zxcvzxcv','김감독','$2a$10$Rja3h.BXtJslxqRNJQDHHObu2Bo08jfkgAvBxjGbaEZLdrJrasgPu','감독',1),(4,'xktmxkem','강태훈','$2a$10$LFfZzOpVTaXQSGOdPTbgC.CjkO7boOZdcNV.FF9vjTDLd6oOVSDba','데이터 전처리 및 딥 러닝 모델 학습 담당',1),(5,'ssafy23','최싸피','$2a$10$w4Uk7StslvQTgYFxb8Wg1uFpHW8arFwkbqveBUECUhOr3kUPaELpi','사원',1),(10,'yj123','우리우','$2a$10$SFocG3NbZYZ65FQnpFVgPO2CVX4zbCOVTIllsPNGjbG.91G.0xYD2','조장',2),(11,'aaa','이인섭','$2a$10$wznq5xqBc5PY3OLeX1ciPuiAd5N.nkdkQeuXZhNQD14OO.JOQsGOW','쫄따구',2),(14,'111','맥도날드','$2a$10$urK6mmj5x5VSnJZ0FNfxR.9TUQAhqzCTxCY4SxfqG/38cA/20BvzS','사장',19),(15,'soaqlqkd','강태훈','$2a$10$.DRxgVTCwU6RNiIxnLWWj.NMUyPdBH5.AQGHDSQkJCuovbRtlEGwK','십장',1),(16,'ssafy123','강태훈','$2a$10$A3pQg2YEP2wOedlFCj4EzebnCQTR36r4c7mKdRVYmTsBpkCJE2Z6i','사원',1),(17,'test','test','$2a$10$MzzG.rDsGGgF9y7fQi4GceMSypJwVPEJyj3YUgtW4I0GszGEjj/aK','관리1팀',25);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 18:14:15
