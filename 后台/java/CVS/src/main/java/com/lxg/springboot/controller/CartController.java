package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.CartMapper;
import com.lxg.springboot.mapper.GoodMapper;
import com.lxg.springboot.model.Cart;
import com.lxg.springboot.model.Good;
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
	@Resource
    private GoodMapper goodMapper;

    @RequestMapping("addtocart")
    public int save(Cart cart) { 	
    	Good good = new Good();
    	Good returngood = new Good();
    	good.setCode(cart.getCode());
    	returngood=goodMapper.query(good);
    	cart.setPrice(returngood.getPrice());
    	return cartMapper.save(cart);
    }    
    
    @RequestMapping("delete")
    public int delete(Cart cart) {
    	return cartMapper.delete(cart);  	
    } 
    
    @RequestMapping("deleteall")
    public int deleteall(Cart cart) {
    	return cartMapper.deleteall(cart);  	
    } 
    
    @RequestMapping("edit")
    public int edit(Cart cart) {
    	return cartMapper.edit(cart);  	
    }  
    
    @RequestMapping("querycart")
    public List<Cart> querybypage(Cart cart) {
    	List<Cart> cartA;  
    	cartA = cartMapper.querybypage(cart.getOpenid());  
    	return cartA;
    } 

}
