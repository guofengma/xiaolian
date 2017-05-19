package com.lxg.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lxg.springboot.bean.User;
import com.lxg.springboot.mapper.UserMapper;
import com.lxg.springboot.util.MatrixToImageWriter;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhenghong
 * on 2017/4/25.
 */
@RestController
public class QrcodeController2 {
	
    @Autowired  
    private UserMapper mapper;  

    @RequestMapping("test")
    public void testinsert() {

    	User user = new User();  
        user.setUserName("张三");  
        user.setAge(23);  
        mapper.save(user);  
        System.out.println("插入用户信息"+user.getUserName());  
    	
    }
    
}
