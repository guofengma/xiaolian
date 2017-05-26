package com.lxg.springboot.mapper;

import com.lxg.springboot.model.User;

public interface UserMapper {

	int save(User user);
	
	int update(User user);

	User query(String id);
	
}