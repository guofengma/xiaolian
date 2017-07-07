package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.model.Order;
import com.lxg.springboot.model.OrderGood;

public interface OrderMapper {

	int save(Order order);
	
	int update(Order order);
	
	List<Order> query(String id);
	
	int savegood(OrderGood ordergood);
	
	List<OrderGood> queryGood(String orderNo);
	
}