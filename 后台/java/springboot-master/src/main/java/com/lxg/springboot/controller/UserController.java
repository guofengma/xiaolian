package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.UserMapper;
import com.lxg.springboot.model.Result;
import com.lxg.springboot.model.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by zhenghong
 * on 2017/4/25.
 */
@RestController
@RequestMapping("health/user/")
public class UserController extends BaseController {
	
	@Resource
    private UserMapper userMapper;

    @RequestMapping("save")
    public Result save(User user) {
    
    	userMapper.save(user);
    	return new Result();
    }    
    
    @RequestMapping("update")
    public Result update(User user) {
    	
    	// 用户数据存储
    	userMapper.update(user);
    	return new Result();
    }
    
    @RequestMapping("query")
    public User query(String openid) {
    	
    	User user = userMapper.query(openid);
    	return user;  	
    }    
}
