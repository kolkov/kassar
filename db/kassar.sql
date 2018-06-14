
CREATE TABLE `additional_option` (
 `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
 `enabled` tinyint(1) NOT NULL,
 `name` varchar(100) NOT NULL,
 `desctiption` varchar(255) NOT NULL,
 `price` decimal(10,2) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `address` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `fias_id` varchar(36) NOT NULL,
 `fias_level` varchar(36) NOT NULL,
 `fias_code` varchar(29) NOT NULL,
 `fias_actuality_state` varchar(2) NOT NULL,
 `full` varchar(255) NOT NULL,
 `unrestricted_value` varchar(100) NOT NULL,
 `country` varchar(50) NOT NULL,
 `country_id` smallint(3) unsigned NOT NULL,
 `region` varchar(50) NOT NULL,
 `region_fias_id` varchar(36) NOT NULL,
 `region_type` varchar(10) NOT NULL,
 `region_with_type` varchar(100) NOT NULL,
 `city` varchar(50) NOT NULL,
 `city_fias_id` varchar(36) NOT NULL,
 `city_type` varchar(10) NOT NULL,
 `city_with_type` varchar(100) NOT NULL,
 `capital_marker` varchar(1) NOT NULL,
 `city_area` varchar(50) NOT NULL,
 `area` varchar(100) NOT NULL,
 `area_fias_id` varchar(36) NOT NULL,
 `area_type` varchar(10) NOT NULL,
 `area_with_type` varchar(100) NOT NULL,
 `settlement` varchar(100) NOT NULL,
 `settlement_fias_id` varchar(36) NOT NULL,
 `settlement_type` varchar(10) NOT NULL,
 `settlement_with_type` varchar(100) NOT NULL,
 `street` varchar(100) NOT NULL,
 `street_fias_id` varchar(36) NOT NULL,
 `street_type` varchar(10) NOT NULL,
 `street_with_type` varchar(100) NOT NULL,
 `postal_code` varchar(6) NOT NULL,
 `house` int(5) NOT NULL,
 `house_fias_id` int(36) NOT NULL,
 `house_type` int(10) NOT NULL,
 `block` varchar(5) NOT NULL,
 `block_type` varchar(10) NOT NULL,
 `flat` varchar(5) NOT NULL,
 `flat_type` varchar(10) NOT NULL,
 `tax_office` varchar(10) NOT NULL,
 `tax_office_legal` varchar(10) NOT NULL,
 `okato` varchar(11) NOT NULL,
 `oktmo` varchar(8) NOT NULL,
 `geo_lat` varchar(10) NOT NULL,
 `geo_lon` varchar(10) NOT NULL,
 `qc_geo` varchar(1) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `fias_id` (`fias_id`),
 KEY `country_id` (`country_id`),
 CONSTRAINT `address_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `article` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `category_id` tinyint(3) unsigned NOT NULL,
 `path` varchar(255) NOT NULL,
 `date` date NOT NULL,
 `title` varchar(255) NOT NULL,
 `meta_description` varchar(255) NOT NULL,
 `meta_keywords` varchar(255) NOT NULL,
 `introduction` varchar(500) NOT NULL,
 `body` text NOT NULL,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `category_id` (`category_id`),
 CONSTRAINT `article_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `article_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `article_category` (
 `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `nickname` varchar(50) NOT NULL,
 `description` varchar(255) NOT NULL,
 `introduction` varchar(512) NOT NULL,
 `meta_description` varchar(255) NOT NULL,
 `meta_keywords` varchar(255) NOT NULL,
 `path` varchar(255) NOT NULL,
 `image` varchar(255) NOT NULL,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8

CREATE TABLE `country` (
 `id` smallint(3) unsigned NOT NULL AUTO_INCREMENT,
 `a2` varchar(2) NOT NULL,
 `a3` varchar(3) NOT NULL,
 `iso` smallint(3) NOT NULL,
 `name` varchar(100) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `id_country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1037 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `customer` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `fio` varchar(100) NOT NULL,
 `first_name` varchar(100) NOT NULL,
 `last_name` varchar(100) NOT NULL,
 `patronymic` varchar(60) NOT NULL,
 `gender` enum('male','female') NOT NULL,
 `phone` varchar(12) NOT NULL,
 `email` varchar(100) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `delivery_address` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `address_id` int(11) unsigned NOT NULL,
 `full` varchar(255) NOT NULL,
 `city` varchar(50) NOT NULL,
 `street` varchar(50) NOT NULL,
 `building` varchar(5) NOT NULL,
 `block` varchar(5) NOT NULL,
 `room` varchar(5) NOT NULL,
 `code` varchar(10) NOT NULL,
 `floor` varchar(2) NOT NULL,
 `entrance` varchar(2) NOT NULL,
 `metro` varchar(30) NOT NULL,
 `fias_id` varchar(36) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `address_id` (`address_id`),
 KEY `fias_id` (`fias_id`),
 CONSTRAINT `delivery_address_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
 CONSTRAINT `delivery_address_ibfk_2` FOREIGN KEY (`fias_id`) REFERENCES `address` (`fias_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `news` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `date` date NOT NULL,
 `heading` varchar(255) NOT NULL,
 `body` varchar(1024) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8

CREATE TABLE `order` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `date` timestamp NOT NULL,
 `customer_id` int(11) unsigned NOT NULL,
 `delivery_id` int(11) unsigned NOT NULL,
 `fio` varchar(100) NOT NULL,
 `registered` tinyint(1) NOT NULL,
 `additional_option_id` tinyint(3) unsigned NOT NULL,
 `delivery_option_id` tinyint(3) unsigned NOT NULL,
 `payment_option_id` tinyint(3) unsigned NOT NULL,
 `sms_option` tinyint(1) NOT NULL,
 `call_option` tinyint(1) NOT NULL,
 `status` tinyint(4) NOT NULL,
 `total` decimal(10,2) NOT NULL,
 `gross_total` decimal(10,2) NOT NULL,
 `note` varchar(512) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `payment_option_id` (`payment_option_id`),
 KEY `delivery_option_id` (`delivery_option_id`),
 KEY `additional_option_id` (`additional_option_id`),
 KEY `customer_id` (`customer_id`),
 KEY `delivery_id` (`delivery_id`),
 CONSTRAINT `order_ibfk_2` FOREIGN KEY (`payment_option_id`) REFERENCES `payment_option` (`id`),
 CONSTRAINT `order_ibfk_3` FOREIGN KEY (`delivery_option_id`) REFERENCES `delivery_option` (`id`),
 CONSTRAINT `order_ibfk_4` FOREIGN KEY (`additional_option_id`) REFERENCES `additional_option` (`id`),
 CONSTRAINT `order_ibfk_5` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
 CONSTRAINT `order_ibfk_6` FOREIGN KEY (`delivery_id`) REFERENCES `delivery_address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `order_customer_map` (
 `order_id` int(11) unsigned NOT NULL,
 `customer_id` int(11) unsigned NOT NULL,
 `delivery_id` int(11) unsigned NOT NULL,
 UNIQUE KEY `delivery_id` (`delivery_id`),
 UNIQUE KEY `order_id` (`order_id`) USING BTREE,
 KEY `customer_id` (`customer_id`),
 CONSTRAINT `order_customer_map_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
 CONSTRAINT `order_customer_map_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
 CONSTRAINT `order_customer_map_ibfk_3` FOREIGN KEY (`delivery_id`) REFERENCES `delivery_address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `order_item` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` int(11) unsigned NOT NULL,
 `product_id` int(11) unsigned NOT NULL,
 `quantity` smallint(6) unsigned NOT NULL,
 PRIMARY KEY (`id`),
 KEY `order_id` (`order_id`),
 KEY `product_id` (`product_id`),
 CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
 CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `payment_option` (
 `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
 `enabled` tinyint(1) NOT NULL,
 `name` varchar(100) NOT NULL,
 `desctiption` varchar(255) NOT NULL,
 `price` tinyint(4) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8

CREATE TABLE `product` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `category_id` int(11) unsigned NOT NULL,
 `name` varchar(255) NOT NULL,
 `product_type` varchar(100) NOT NULL,
 `description` varchar(1024) NOT NULL,
 `price` decimal(10,2) NOT NULL,
 `meta_description` varchar(200) NOT NULL,
 `meta_keywords` varchar(100) NOT NULL,
 `path` varchar(255) NOT NULL,
 `img` varchar(255) NOT NULL,
 `url` varchar(255) NOT NULL,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `category_id` (`category_id`),
 CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `product_category` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `nickname` varchar(50) NOT NULL,
 `description` varchar(255) NOT NULL,
 `introduction` varchar(512) NOT NULL,
 `meta_description` varchar(255) NOT NULL,
 `meta_keywords` varchar(255) NOT NULL,
 `image` varchar(255) NOT NULL,
 `path` varchar(255) NOT NULL,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8

CREATE TABLE `product_properties` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `product_id` int(11) unsigned NOT NULL,
 `name` varchar(255) NOT NULL,
 `value` varchar(1024) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `product_id` (`product_id`),
 CONSTRAINT `product_properties_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT

CREATE TABLE `site_settings` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(50) NOT NULL,
 `value` varchar(50) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_name` varchar(50) NOT NULL,
 `login` varchar(20) NOT NULL,
 `auth_key` varchar(32) DEFAULT NULL,
 `email_confirm_token` varchar(255) DEFAULT NULL,
 `password_hash` varchar(100) NOT NULL,
 `password_reset_token` varchar(255) DEFAULT NULL,
 `email` varchar(60) NOT NULL,
 `mobile` varchar(14) NOT NULL,
 `status` smallint(6) NOT NULL,
 `last_login` timestamp NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `idx_user_email` (`email`) USING BTREE,
 KEY `idx_user_username` (`user_name`),
 KEY `idx_user_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT