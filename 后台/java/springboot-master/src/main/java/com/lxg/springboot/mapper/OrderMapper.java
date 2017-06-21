package com.lxg.springboot.mapper;

import com.lxg.springboot.model.Order;

public interface OrderMapper {

	int save(Order order);
	
	int update(Order order);
	
}