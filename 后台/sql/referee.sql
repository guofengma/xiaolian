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

 Date: 05/24/2017 15:58:54 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `referee`
-- ----------------------------
DROP TABLE IF EXISTS `referee`;
CREATE TABLE `referee` (
  `openid` varchar(30) NOT NULL,
  `referee1` varchar(30) NOT NULL,
  `referee2` varchar(30) NOT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
