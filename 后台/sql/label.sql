/*
 Navicat Premium Data Transfer

 Source Server         : 211.159.175.75
 Source Server Type    : MySQL
 Source Server Version : 50636
 Source Host           : 211.159.175.75
 Source Database       : health

 Target Server Type    : MySQL
 Target Server Version : 50636
 File Encoding         : utf-8

 Date: 05/24/2017 15:59:05 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `label`
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `labelid` varchar(3) NOT NULL,
  `type` varchar(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`labelid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
