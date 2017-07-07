package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.GoodMapper;
import com.lxg.springboot.model.Good;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.annotation.Resource;

/**
 * Created by xuhuadong
 */
@RestController
@RequestMapping("CVS/good/")
public class GoodController extends BaseController {
	
	@Resource
    private GoodMapper goodMapper;
    
    @RequestMapping("queryall")
    public List<Good> query() {	
    	return goodMapper.queryall();  	
    }  
    
    @RequestMapping("query")
    public Good queryReferee(Good good) {
      		
    	Good returngood = new Good();
    	returngood=goodMapper.query(good);
    	return returngood;  	
    }  

       
}
