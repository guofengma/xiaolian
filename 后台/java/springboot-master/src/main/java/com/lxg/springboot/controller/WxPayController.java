package com.lxg.springboot.controller;

import com.lxg.springboot.mapper.OrderMapper;
import com.lxg.springboot.mapper.ScoreMapper;
import com.lxg.springboot.model.HttpResult;
import com.lxg.springboot.model.Order;
import com.lxg.springboot.model.OrderInfo;
import com.lxg.springboot.model.OrderReturnInfo;
import com.lxg.springboot.model.SignInfo;
import com.lxg.springboot.model.Token;
import com.lxg.springboot.service.HttpAPIService;
import com.lxg.springboot.util.RandomStringGenerator;
import com.lxg.springboot.util.Signature;
import com.lxg.springboot.util.StreamUtil;
import com.lxg.springboot.util.XmlUtil;
import com.thoughtworks.xstream.XStream;

import org.jdom.JDOMException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhenghong
 * on 2017/4/25.
 */
@RestController
public class WxPayController {
	
    @Value("${wx.appid}")
    private String appid; 
    @Value("${wx.mch_id}")
    private String mch_id;     

	@Resource
    private HttpAPIService httpAPIService;
	@Resource
    private OrderMapper orderMapper;

    @RequestMapping("wxpay/prepay")
    public String prepay(Order Order) throws Exception {	
		OrderInfo order = new OrderInfo();
		String orderNo = RandomStringGenerator.getRandomStringByLength(32);
		Order.setMch_id(mch_id);
		Order.setOrderNo(orderNo);
		Date date=new Date(); 
		DateFormat format=new SimpleDateFormat("yyyyMMddHHmmss"); 
		String time=format.format(date);
		Order.setTime(time);
		Order.setState(2);
		orderMapper.save(Order);
		
		order.setAppid(appid);
		order.setMch_id(mch_id);
		order.setNonce_str(RandomStringGenerator.getRandomStringByLength(32));
		order.setBody(new String(Order.getDescription().getBytes(),"UTF-8"));
		order.setOut_trade_no(orderNo);
		order.setTotal_fee(Order.getFee());
		order.setSpbill_create_ip("123.57.218.54");
		order.setNotify_url("https://health.lianlianchains.com/wxpay/result");
		order.setTrade_type("JSAPI");
		order.setOpenid(Order.getOpenid());
		order.setSign_type("MD5");
		//生成签名
		String sign = Signature.getSign(order);
		order.setSign(sign);
		
		System.out.println("body===="+order.getBody());
		
		HttpResult result = httpAPIService.doPost("https://api.mch.weixin.qq.com/pay/unifiedorder", order);
		
		XStream xStream = new XStream();
		xStream.alias("xml", OrderReturnInfo.class); 

		OrderReturnInfo returnInfo = (OrderReturnInfo)xStream.fromXML(result.getBody());
		JSONObject json = new JSONObject();
		json.put("prepay_id", returnInfo.getPrepay_id());
		json.put("return_code", returnInfo.getReturn_code());
		json.put("return_msg", returnInfo.getReturn_msg());
		
		return json.toJSONString();	
    }
    
    @RequestMapping("wxpay/sign")
    public String sign(String repay_id) throws Exception {

		SignInfo signInfo = new SignInfo();
		signInfo.setAppId(appid);
		long time = System.currentTimeMillis()/1000;
		signInfo.setTimeStamp(String.valueOf(time));
		signInfo.setNonceStr(RandomStringGenerator.getRandomStringByLength(32));
		signInfo.setRepay_id("prepay_id="+repay_id);
		signInfo.setSignType("MD5");
		//生成签名
		String sign = Signature.getSign(signInfo);
		
		JSONObject json = new JSONObject();
		json.put("timeStamp", signInfo.getTimeStamp());
		json.put("nonceStr", signInfo.getNonceStr());
		json.put("package", signInfo.getRepay_id());
		json.put("signType", signInfo.getSignType());
		json.put("paySign", sign);
		
		return json.toJSONString();
		
    }

    @RequestMapping("wxpay/result")
    public void result(HttpServletRequest request,HttpServletResponse response) throws IOException {  	
    	System.out.println("微信支付回调");
        InputStream inStream = request.getInputStream();
        ByteArrayOutputStream outSteam = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outSteam.write(buffer, 0, len);
        }
        outSteam.close();
        inStream.close();
        String result = new String(outSteam.toByteArray(), "utf-8");
        System.out.println("微信支付通知结果：" + result);
        Map<String, String> map = null;
        try {
            /**
             * 解析微信通知返回的信息
             */
            map = XmlUtil.doXMLParse(result);
        } catch (JDOMException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        Order Order = new Order();
        Order.setOrderNo(map.get("out_trade_no"));
        if (map.get("result_code").equals("SUCCESS")) {
        	Order.setState(1);		
        }
        else{
        	Order.setState(0);	
        }               
		orderMapper.update(Order);        
    }
    
}
