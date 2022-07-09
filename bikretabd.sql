-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2022 at 11:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikretabd`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_add_form_setting`
--

CREATE TABLE `admin_add_form_setting` (
  `id` int(11) NOT NULL,
  `cat` varchar(200) NOT NULL,
  `sub_cat` varchar(200) NOT NULL,
  `item` varchar(200) NOT NULL,
  `brand` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_add_form_setting`
--

INSERT INTO `admin_add_form_setting` (`id`, `cat`, `sub_cat`, `item`, `brand`) VALUES
(1, '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `admin_profile`
--

CREATE TABLE `admin_profile` (
  `id` int(11) NOT NULL,
  `company_name` varchar(300) NOT NULL,
  `company_address` varchar(300) NOT NULL,
  `company_img` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_profile`
--

INSERT INTO `admin_profile` (`id`, `company_name`, `company_address`, `company_img`) VALUES
(1, 'birkreatabd.com ', 'Badda, Dhaka, Bangladesh. ', '1656606320970.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`, `slug`, `brand_img`) VALUES
(2, 'Pran', 'sadfs-sdfsdf', '1654875670300.jpg'),
(4, 'Basundra company', 'Basundra-company', '1654959500776.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `catagoris`
--

CREATE TABLE `catagoris` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `catagory_img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `catagoris`
--

INSERT INTO `catagoris` (`id`, `name`, `slug`, `catagory_img`, `meta_description`) VALUES
(33, 'dsfasd as dfsadf', 'dsfasd-as dfsadf', '1656157437083.jpg', 'asdfasdfasdf'),
(34, 'sdfasdf sdafasdf', 'sdfasdf-sdafasdf', '1656157451688.jpg', 'sadfasdf asdfasdfasdf');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `display_name` varchar(250) NOT NULL DEFAULT 'avater',
  `photo` varchar(550) DEFAULT NULL,
  `username` varchar(300) NOT NULL,
  `dbpassword` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `nid_number` varchar(150) NOT NULL,
  `phone` varchar(15) NOT NULL DEFAULT '+08801',
  `type` varchar(200) NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `display_name`, `photo`, `username`, `dbpassword`, `email`, `nid_number`, `phone`, `type`) VALUES
(13, 'sumon hossain', '1656159896860.jpg', 'sumon@gmail.com', '$2b$10$W1Euxh.pXd0TdiV5YpDbzO8nhbXd628yfuFb5KY1opvE57DWsceyi', 'sumon@gmail.com', '123456789123456', '01776502018', 'inactive'),
(14, 'uzzal ', '1656159896860.jpg', 'uhitbd@gmail.com', '$2b$10$1iuEcVRwlu5EV57hu4fi1eqxmfBT9Jfn/HWiRbHwNcVFVl8.X3aOC', 'uhitbd@gmail.com', '0158645252523200', '01837460931', 'inactive'),
(15, 'Robel', 'user.png', 'robel@gmail.com', '$2b$10$gqlkHtd3kP9I.hbXL6cSLu7fljXsgP6Henq7b9b9lL2ceJlj6O7VO', 'robel@gmail.com', '987456321', '01985492151', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_cat_id` int(11) NOT NULL DEFAULT 0,
  `brand_id` int(11) NOT NULL DEFAULT 0,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fontimg` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backimg` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_price` double DEFAULT NULL,
  `regular_price` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_name`, `sub_cat_id`, `brand_id`, `slug`, `details`, `fontimg`, `backimg`, `discount_price`, `regular_price`, `stock`, `status`, `link`) VALUES
(2, 'sadfsadf asdfasdfasdf', 25, 0, 'sadfsadf-asdfasdfasdf', 'sadfas sadfasdfa sdfsadf', '1654867277978.jpg', '1654867277986.jpg', 555, '99999', '1', '1', 'http://localhost:8000/admin/items'),
(3, 'Jus pran', 26, 2, 'Jus-pran', 'http://localhost:3000/admin/add_itemhttp://localhost:3000/admin/add_itemhttp://localhost:3000/admin/add_item', '1654957732038.jpg', '1654957732041.jpg', 54, '40', '1', '1', 'http://localhost:3000/admin/add_item'),
(4, 'sadf asdfasdf', 25, 2, 'sadf-asdfasdf', 'sadfasdf asdfasdf', '1654957823253.jpg', '1654957823256.jpg', 544, '699', '1', '1', 'asdfasdf'),
(5, 'sdf asdfasdf', 25, 2, 'sdf-asdfasdf', 'asdfasdf asdfasdf', '1654957921695.jpg', '1654957921696.jpg', 5577, '58889', '1', '1', 'asdfasdf'),
(6, 'product ss', 25, 2, 'product-ss', 'sadf asdfasdf', '1654958018582.jpg', '1654958018585.jpg', 555, '998', '0', '1', 'http://localhost:8000/admin/items');

-- --------------------------------------------------------

--
-- Table structure for table `settingside`
--

CREATE TABLE `settingside` (
  `id` int(11) NOT NULL,
  `header_back_color` varchar(200) DEFAULT NULL,
  `left_back_color` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settingside`
--

INSERT INTO `settingside` (`id`, `header_back_color`, `left_back_color`) VALUES
(1, '#0f3d43', '#2f5f83');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `title`, `photo`, `link`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Gril drass', '1646367587.jpg', 'asdfasdf', 'adsfasdf', '2022-03-03 22:19:47', '2022-03-03 22:19:47'),
(2, 'asdfasdfasdf', '1646367601.jpg', 'asdfasdf', 'asdfasdf', '2022-03-03 22:20:01', '2022-03-03 22:20:01');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_catagory_img` varchar(1500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `slug`, `sub_catagory_img`, `category_id`) VALUES
(9, 'asdf asdfasdf', 'asdf-asdfasdf', '1656157586709.jpg', '33');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `dbpassword` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `dbpassword`, `email`, `type`) VALUES
(28, 'bikreta@gmail.com', '$2b$10$0GWuOGBQ1E57BNF.KixmM.f1atWRhxapFWa1suOTLolOy6TOAwvn6', '', 'admin'),
(29, 'bikreta@gmail.com', '$2b$10$Jr/RyfKiRDqFkpsWtAtiqu2vkJjMaHiRU4CFo9mSaw8SmIPOjYAyy', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_add_form_setting`
--
ALTER TABLE `admin_add_form_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_profile`
--
ALTER TABLE `admin_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_name_unique` (`brand_name`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indexes for table `catagoris`
--
ALTER TABLE `catagoris`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `catagoris_name_unique` (`name`),
  ADD UNIQUE KEY `catagoris_slug_unique` (`slug`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `items_slug_unique` (`slug`);

--
-- Indexes for table `settingside`
--
ALTER TABLE `settingside`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subcategories_name_unique` (`name`),
  ADD UNIQUE KEY `subcategories_slug_unique` (`slug`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_add_form_setting`
--
ALTER TABLE `admin_add_form_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_profile`
--
ALTER TABLE `admin_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `catagoris`
--
ALTER TABLE `catagoris`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settingside`
--
ALTER TABLE `settingside`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
