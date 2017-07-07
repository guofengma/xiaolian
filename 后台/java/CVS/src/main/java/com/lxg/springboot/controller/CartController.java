package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.CartMapper;
import com.lxg.springboot.model.Cart;
import com.lxg.springboot.model.Result;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.annotation.Resource;


@RestController
@RequestMapping("CVS/cart/")
public class CartController extends BaseController {
	
	@Resource
    private CartMapper cartMapper;

    @RequestMapping("addtocart")
    public int save(Cart cart) { 	
    	return cartMapper.save(cart);
    }    
    
    @RequestMapping("delete")
    public int query(Cart cart) {
    	return cartMapper.delete(cart);  	
    }  
    
    @RequestMapping("querycart")
    public List<Cart> querybypage(Cart cart) {
    	    
    	return cartMapper.querybypage(cart.getOpenid());  	
    } 

}
