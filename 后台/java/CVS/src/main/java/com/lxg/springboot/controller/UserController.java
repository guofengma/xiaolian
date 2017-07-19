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
@RequestMapping("CVS/user/")
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
    public User query(User user) {
    	
    	User userf = userMapper.query(user);
    	return userf;  	
    }  
    
    @RequestMapping("login")
    public String login(User user) {    	
    	if(userMapper.count(user)==1){
    		User userf = userMapper.querybyno(user);
    		return userf.getStoreid();
    	}
    	else{
    		return "登陆失败";
    	}
    }    
}
