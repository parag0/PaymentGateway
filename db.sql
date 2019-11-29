create database paymentGateway;

CREATE TABLE `paymentGateway`.`order_payment_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `createdDate` timestamp default now(),
  `updatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_name` varchar(255) NOT NULL,
  `amount` DECIMAL(13, 4) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `cardholder_name` varchar(255) NOT NULL,
  `payment_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;