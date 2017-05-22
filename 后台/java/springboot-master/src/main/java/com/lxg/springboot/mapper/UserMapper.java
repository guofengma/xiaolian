package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.model.User;

public interface UserMapper {

	int save(User user);

	User selectById(Integer id);

	int updateById(User user);

	int deleteById(Integer id);

	List<User> queryAll();

}