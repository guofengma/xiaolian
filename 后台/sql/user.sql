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

 Date: 05/24/2017 15:53:26 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `openid` varchar(30) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `age` varchar(3) NOT NULL,
  `phoneno` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
