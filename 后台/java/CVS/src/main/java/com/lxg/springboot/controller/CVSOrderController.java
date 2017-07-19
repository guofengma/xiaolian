package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.OrderMapper;
import com.lxg.springboot.mapper.CartMapper;
import com.lxg.springboot.model.Order;
import com.lxg.springboot.model.Cart;
import com.lxg.springboot.model.Good;
import com.lxg.springboot.model.Order;
import com.lxg.springboot.model.OrderGood;
import com.lxg.springboot.model.Result;
import com.lxg.springboot.model.Score;
import com.lxg.springboot.util.RandomStringGenerator;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

/**
 * Created by xuhuadong
 */
@RestController
@RequestMapping("CVS/order/")
public class CVSOrderController extends BaseController {
	
	@Resource
    private OrderMapper OrderMapper;
	@Resource
	private CartMapper cartMapper;
    @RequestMapping("createOrder")
    public int createOrder(String openid,String storeid) {
    	Order order = new Order();
    	String OrderNo = RandomStringGenerator.getRandomStringByLength(32);
    	order.setOpenid(openid);
    	order.setOrderNo(OrderNo);
    	order.setState(0);
    	Date date=new Date(); 
		DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss"); 
		String time=format.format(date);
		order.setTime(time);
		Cart temp = new Cart();
		temp.setOpenid(openid);
		temp.setStoreid(storeid);
		List<Cart> cart;
		List<OrderGood> ordergood;
		cart = cartMapper.querybypage(temp);
		for(int i = 0 ; i < cart.size() ; i++) {
			OrderGood tempA = new OrderGood();
			tempA.setAmount(cart.get(i).getAmount());
			tempA.setCode(cart.get(i).getCode());
			tempA.setOrderNo(OrderNo);
			tempA.setStoreid(storeid);
			OrderMapper.savegood(tempA);		 
        }
		return OrderMapper.save(order);
    }
    
    @RequestMapping("query")
    public List<Order> query(Order order) {	
    	return OrderMapper.query(order);  	
    }  
}
