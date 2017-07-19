package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.model.Order;
import com.lxg.springboot.model.OrderGood;

public interface OrderMapper {

	int save(Order order);
	
	int update(Order order);
	
	int updatecheck(Order order);
	
	List<Order> query(Order order);
	
	List<Order> queryshop(Order order);
	
	int savegood(OrderGood ordergood);
	
	List<OrderGood> queryGood(Order order);
	
}