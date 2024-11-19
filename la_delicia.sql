-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: ladelicia_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalCost` decimal(10,0) NOT NULL,
  `date` datetime NOT NULL,
  `state` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,15000,'2024-08-23 00:00:00','Confirmado','2024-08-23 19:18:38','2024-08-23 19:18:38');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cremas heladas','2024-08-23 05:26:02','2024-09-09 03:44:04'),(2,'Dulces de leche','2024-08-23 05:26:47','2024-08-23 05:26:47'),(3,'Chocolates','2024-08-23 05:26:56','2024-08-23 05:27:35'),(4,'Frutas a la crema','2024-08-23 05:27:59','2024-08-23 05:27:59'),(9,'Frutas al agua','2024-09-17 22:36:58','2024-09-17 22:36:58'),(10,'Cremas especiales','2024-09-19 00:15:19','2024-10-20 15:46:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `icecreamtastes`
--

DROP TABLE IF EXISTS `icecreamtastes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `icecreamtastes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taste` varchar(100) NOT NULL,
  `ingredients` varchar(100) DEFAULT NULL,
  `shortDescription` varchar(100) DEFAULT NULL,
  `nutritionalValue` varchar(200) DEFAULT NULL,
  `photos` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  `stock` int NOT NULL,
  `productTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `productTypeId` (`productTypeId`),
  CONSTRAINT `icecreamtastes_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `icecreamtastes_ibfk_2` FOREIGN KEY (`productTypeId`) REFERENCES `producttypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `iceCreamTastes_productTypeId_foreign_idx` FOREIGN KEY (`productTypeId`) REFERENCES `producttypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icecreamtastes`
--

LOCK TABLES `icecreamtastes` WRITE;
/*!40000 ALTER TABLE `icecreamtastes` DISABLE KEYS */;
INSERT INTO `icecreamtastes` VALUES (2,'Chocolate - Americana - Vainilla','Leche, calcio, proteinas','Pote Familiar 3L - Chocolate - Americana - Vainilla','200 cal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/09/familiar3lt-1.jpg','2024-08-21 01:56:33','2024-10-02 21:38:37',1,8,1),(6,'Chocolate','Leche, cacao semi amargo','Pote mayorista de 10L de helado sabor chocolate','300kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/chocolate.jpg','2024-09-03 23:57:31','2024-10-02 21:30:05',3,15,2),(7,'Crema coockie','Leche, trocitos de galletita','Pote mayorista de 10L de helado sabor crema cookie','300kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/crema-cookie.jpg','2024-09-03 23:58:04','2024-10-02 21:30:15',10,5,2),(8,'Frutilla a la crema','Leche, frutillas frescas','Palito de helado de crema sabor frutilla','250kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/frutilla-crema.jpg','2024-09-03 23:58:46','2024-10-02 21:29:43',4,20,4),(9,'Frutilla al agua','Agua, frutillas frescas','Palito de helado de agua sabor frutilla','230kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/11/frutilla-agua.jpg','2024-09-04 01:40:36','2024-10-02 21:29:24',9,20,4),(10,'Granizado','Leche, chips de chocolate','Pote mayorista de 10L de helado sabor crema americana con chips de chocolate','150 kcal por porcion','https://argentina.gridohelado.com/wp-content/themes/grido/images/productos/sabores/granizado.jpg','2024-09-04 23:42:31','2024-10-02 21:31:11',1,4,2),(12,'Menta granizada','Leche, menta, chips de chocolate','Pote mayorista de 10L de h elado de crema sabor menta granizada','300 kcal','https://gridohelado.com/wp-content/themes/grido/images/productos/sabores/menta-granizada.jpg','2024-09-05 04:02:36','2024-10-02 21:31:30',10,3,2),(13,'Kinotos al whikey','Kinotos, Whisky','Tacita de helado sabor kinotos al whiskey','400 kcal','https://argentina.gridohelado.com/wp-content/uploads/2016/06/kinotos.jpg','2024-09-06 23:52:26','2024-10-02 21:32:17',10,5,6),(14,'Dulce de leche granizado','Leche, dulce de leche, chocolate','Pote mayorista de 10L de helado sabor dulce de leche granizado','500 kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/dulcedeleche-granizado.jpg','2024-09-09 03:40:36','2024-10-02 21:32:57',2,10,2),(15,'Dulce de leche - Americana - Frutilla','Leche, saborizante','Pote familiar de 3L sabor Chocolate - Americana - Vainilla','400 kcal','https://argentina.gridohelado.com/wp-content/uploads/2016/09/familiar3lt-1.jpg','2024-09-09 04:13:52','2024-10-02 21:38:56',1,10,1),(18,'Americana','Leche','Pote mayorista sabor crema americana ','500 kcal por porcion','https://argentina.gridohelado.com/wp-content/uploads/2016/06/crema-americana.jpg','2024-09-17 22:38:07','2024-10-02 21:34:53',1,16,2),(19,'Dulce de leche','Leche, dulce de leche','Pote mayorista de 10L de helado sabor dulce de leche','300 kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/dulcedeleche.jpg','2024-09-17 23:44:47','2024-10-02 21:35:22',2,23,2),(23,'Chocolate - Vainilla - Frutilla','Leche, chocolate amargo, esencia de vainilla, frutilla ','Pote familia de 3L sabor Chocolate - Vainilla - Frutilla','1000 kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/09/familiar3lt-1.jpg','2024-10-02 20:46:04','2024-10-02 21:39:38',1,12,1),(24,'Limón al agua','Agua, jugo de limón','Tacita de helado de sabor a limón al agua','50 kcal por porción','https://argentina.gridohelado.com/wp-content/uploads/2016/06/limon.jpg','2024-10-02 20:49:59','2024-10-02 21:41:20',9,20,6),(25,'Tramontana','Leche, calcio, proteinas, micro galletas bañadas en chocolate.','Pote mayorista de helado sabor chantilly con dulce de leche y micro galletas bañadas en chocolate.','250 kcal por porcion','https://argentina.gridohelado.com/wp-content/uploads/2016/06/tramontana.jpg','2024-10-02 21:00:53','2024-10-02 21:43:26',10,123,4),(26,'Limon - Chocolate - Frutilla - Vainilla - Dulce de leche','','Pote familiar de helado sabor Limon - Chocolate - Frutilla - Vainilla - Dulce de leche','','https://argentina.gridohelado.com/wp-content/uploads/2016/09/familiar3lt-1.jpg','2024-10-08 22:51:53','2024-11-05 04:09:57',1,10,7);
/*!40000 ALTER TABLE `icecreamtastes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producthascarts`
--

DROP TABLE IF EXISTS `producthascarts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producthascarts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cartId` int DEFAULT NULL,
  `iceCreamTasteId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cartId` (`cartId`),
  KEY `iceCreamTasteId` (`iceCreamTasteId`),
  CONSTRAINT `producthascarts_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `producthascarts_ibfk_2` FOREIGN KEY (`iceCreamTasteId`) REFERENCES `icecreamtastes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productHasCarts_iceCreamTasteId_foreign_idx` FOREIGN KEY (`iceCreamTasteId`) REFERENCES `icecreamtastes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producthascarts`
--

LOCK TABLES `producthascarts` WRITE;
/*!40000 ALTER TABLE `producthascarts` DISABLE KEYS */;
/*!40000 ALTER TABLE `producthascarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producttypes`
--

DROP TABLE IF EXISTS `producttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producttypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producttypes`
--

LOCK TABLES `producttypes` WRITE;
/*!40000 ALTER TABLE `producttypes` DISABLE KEYS */;
INSERT INTO `producttypes` VALUES (1,'Pote familiar 3L',5000,'2024-08-23 04:12:39','2024-09-10 23:57:49'),(2,'Pote mayorista 10L',20000,'2024-08-23 04:12:57','2024-08-23 04:13:33'),(4,'Palito',200,'2024-09-03 23:40:46','2024-09-03 23:40:46'),(6,'Tacita',2000,'2024-09-10 23:57:23','2024-09-10 23:57:23'),(7,'Pote 5L',10000,'2024-10-08 22:50:43','2024-10-20 15:45:42');
/*!40000 ALTER TABLE `producttypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11 18:16:47
