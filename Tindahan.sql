-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 28, 2021 at 08:07 AM
-- Server version: 5.7.34-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedbtech_Ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Christian R. Paranas', 'christian', 'christian@gmail.com', 'theathea', '2021-03-31 13:47:35'),
(2, 'Admin', 'admin', 'admin@gmail.com', 'admin', '2021-04-02 06:04:41');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `address`) VALUES
(48, 'chan hello', 'christian@gmail.com', '$2a$10$4zK7RfvozJkimCPk2wSFIOBoiQ6pzLEGuHFI82ZrAwMPu7rltqcTy', '2021-04-25 12:56:43', '2021-05-28 07:58:07', 'Brgy. 77'),
(49, 'Kalel Macasa', 'kalel@gmail.com', '$2a$10$XsyoP8woJ.L63UAr/CKJYOxbO9xI7B7fO3bQFW50g2lyTsZC93so6', '2021-04-30 08:03:33', '2021-04-30 08:03:33', 'Brgy &9 Marasbars Tacloban City'),
(50, 'asd', 'asd@asd.asd', '$2a$10$iHkMg/gH7PUmUBcWlp5jzeyqenmigmImgvHUihN4tvOiwIDXmZcfG', '2021-05-01 22:05:44', '2021-05-01 22:05:44', 'asd');

-- --------------------------------------------------------

--
-- Table structure for table `customers_cart`
--

CREATE TABLE `customers_cart` (
  `id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `total` float(10,2) NOT NULL,
  `status` varchar(10) NOT NULL,
  `payment_mode` varchar(20) NOT NULL,
  `shipping_option` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total`, `status`, `payment_mode`, `shipping_option`, `created_at`) VALUES
(102, 48, 299.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-04-25 13:07:04'),
(103, 48, 5000.00, 'Delivered', 'Cash on Delivery', 'Ninja Van', '2021-04-27 14:05:02'),
(104, 48, 12195.00, 'Delivered', 'Cash on Delivery', 'Entrego', '2021-04-30 07:41:19'),
(105, 48, 6032.00, 'Delivered', 'Cash on Delivery', 'Ninja Van', '2021-04-30 07:52:57'),
(106, 48, 119983.00, 'Delivered', 'Credit Card', 'Ninja Van', '2021-04-30 11:04:22'),
(107, 49, 1300.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-04-30 11:45:41'),
(108, 49, 16050.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-04-30 11:55:08'),
(109, 48, 3500.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-04-30 12:29:02'),
(110, 48, 2750.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-01 07:54:05'),
(111, 50, 299.00, 'Pending', 'Cash on Delivery', 'J&T Expres', '2021-05-01 22:06:23'),
(112, 48, 350.00, 'Pending', 'Cash on Delivery', 'J&T Expres', '2021-05-02 02:08:58'),
(113, 48, 1410.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-03 12:22:01'),
(114, 48, 1111.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-03 14:09:45'),
(115, 48, 299.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-03 14:13:10'),
(116, 48, 2600.00, 'Pending', 'Cash on Delivery', 'J&T Expres', '2021-05-03 14:48:56'),
(117, 48, 360.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-03 14:52:16'),
(118, 48, 100000.00, 'Delivered', 'Cash on Delivery', 'Ninja Van', '2021-05-03 15:00:49'),
(119, 48, 400000.00, 'Delivered', 'Cash on Delivery', 'Ninja Van', '2021-05-04 14:25:24'),
(120, 48, 40000.00, 'Delivered', 'Cash on Delivery', 'Ninja Van', '2021-05-10 08:12:33'),
(121, 48, 127250.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-20 18:30:06'),
(122, 48, 60000.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-28 05:30:25'),
(123, 48, 50000.00, 'Pending', 'Cash on Delivery', 'Ninja Van', '2021-05-28 08:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_items_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`order_items_id`, `product_id`, `quantity`, `order_id`) VALUES
(109, 69, 1, 102),
(110, 68, 5, 103),
(111, 55, 6, 104),
(112, 69, 5, 104),
(113, 64, 5, 104),
(114, 68, 3, 105),
(115, 69, 1, 105),
(116, 44, 2, 105),
(117, 59, 14, 106),
(118, 39, 8, 106),
(119, 63, 9, 106),
(120, 69, 3, 106),
(121, 64, 1, 107),
(122, 65, 1, 108),
(123, 62, 4, 108),
(124, 44, 12, 108),
(125, 60, 1, 109),
(126, 65, 11, 110),
(127, 69, 1, 111),
(128, 62, 1, 112),
(129, 68, 1, 113),
(130, 69, 1, 113),
(131, 68, 1, 114),
(132, 69, 1, 115),
(133, 64, 2, 116),
(134, 39, 30, 117),
(135, 70, 5, 118),
(136, 70, 20, 119),
(137, 70, 2, 120),
(138, 57, 1, 121),
(139, 44, 1, 121),
(140, 55, 1, 121),
(141, 58, 5, 121),
(142, 70, 3, 122),
(143, 71, 1, 123);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_price` decimal(20,2) DEFAULT NULL,
  `product_quantity` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_image`, `product_description`, `product_price`, `product_quantity`, `created_at`, `updated_at`) VALUES
(37, 'T', 'inbound6819404580670251991.jpg', '', '12.00', 0, '2021-04-04 04:13:09', '2021-04-21 09:08:28'),
(39, 'IceCream', 'IMG20200818170503.jpg', 'N', '12.00', 0, '2021-04-04 07:42:19', '2021-05-03 14:54:54'),
(44, 'sapatos', 'FB_IMG_16164309872279062.jpg', '', '1200.00', 467, '2021-04-05 16:01:36', '2021-05-20 18:30:07'),
(45, 'Desk', 'FB_IMG_16157082671020298.jpg', 'lamesa de papel', '1200.00', 10, '2021-04-06 15:30:23', '2021-04-19 14:44:16'),
(55, 'Kiddo backpack', 'Bag2.jpeg', 'Dora\'s Backpack', '700.00', 3, '2021-04-07 13:29:36', '2021-05-20 18:30:07'),
(56, 'Nike Shoes', 'Shoes1.jpeg', '', '13000.00', 0, '2021-04-07 13:30:07', '2021-04-22 03:21:23'),
(57, 'Plain dark shirt', 'Shirt1.jpeg', '', '350.00', 53, '2021-04-07 13:30:53', '2021-05-20 18:30:07'),
(58, 'Bag oong', 'Bag1.jpeg', 'Expensive bag', '25000.00', 106, '2021-04-07 13:31:39', '2021-05-20 18:30:07'),
(59, 'Horseshoe shirt', 'Shirt2.jpeg', '', '785.00', 6, '2021-04-07 13:32:28', '2021-04-30 11:04:22'),
(60, 'Nikee Shoes', 'Shoes2.jpeg', '', '3500.00', 60, '2021-04-07 13:32:59', '2021-04-30 12:29:02'),
(61, 'Misayy', 'FB_IMG_16178187570396098.jpg', '', '505.00', 12, '2021-04-09 11:12:47', '2021-04-09 11:13:13'),
(62, 'Knife', 'FB_IMG_16178090024579204.jpg', '', '350.00', 7, '2021-04-09 16:11:13', '2021-05-02 02:08:58'),
(63, 'Lapitap', '20210319_134144.jpg', 'Lorem lorem lorem lorem lorem lorem lorem lorem lorem\nLorem', '12000.00', 18, '2021-04-12 15:48:43', '2021-05-01 08:28:46'),
(64, 'Vans', 'FB_IMG_16160999983035558.jpg', 'Great shoes', '1300.00', 0, '2021-04-12 16:46:56', '2021-05-03 14:48:57'),
(65, 'Sign Board', 'FB_IMG_16170338775542767.jpg', 'Wall sign', '250.00', 0, '2021-04-12 16:59:08', '2021-05-01 07:54:06'),
(66, 'Spider Boy Suit', 'FB_IMG_16090840489369055.jpg', 'Spiderman suit for kids ', '450.00', 0, '2021-04-17 06:54:07', '2021-04-21 09:37:40'),
(68, 'Vaccine', 'FB_IMG_15974599168761493.jpg', 'Covid19 vaccine that will give power', '1111.00', 2, '2021-04-17 17:14:14', '2021-05-28 04:21:21'),
(69, 'Abstract Art', 'test1.png', 'Buy Me now! hehe', '299.00', 18, '2021-04-22 05:22:39', '2021-05-03 14:13:10'),
(70, 'Survey corps', 'FB_IMG_15973368535394205.jpg', 'Sasageyo', '20000.00', 20, '2021-05-03 15:00:01', '2021-05-28 05:30:25'),
(71, 'Multi purpose bag', 'FB_IMG_16120934972089477.jpg', 'Pwede sa bata, pwede sa matanda', '50000.00', 24, '2021-05-28 08:03:22', '2021-05-28 08:04:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers_cart`
--
ALTER TABLE `customers_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_items_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `customers_cart`
--
ALTER TABLE `customers_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
