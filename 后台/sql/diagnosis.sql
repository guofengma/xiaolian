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

 Date: 05/24/2017 15:59:12 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `diagnosis`
-- ----------------------------
DROP TABLE IF EXISTS `diagnosis`;
CREATE TABLE `diagnosis` (
  `diagnosisid` varchar(30) NOT NULL,
  `openid` varchar(30) NOT NULL,
  `datetime` varchar(14) NOT NULL,
  `symptom` varchar(200) NOT NULL,
  `amt` varchar(18) NOT NULL,
  `hospital` varchar(50) NOT NULL,
  `doctor` varchar(50) NOT NULL,
  `evaluate` varchar(1) NOT NULL,
  `label` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`diagnosisid`,`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
