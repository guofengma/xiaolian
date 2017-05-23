package com.lxg.springboot.controller;

import com.lxg.springboot.model.HttpResult;
import com.lxg.springboot.model.OrderInfo;
import com.lxg.springboot.model.OrderReturnInfo;
import com.lxg.springboot.model.SignInfo;
import com.lxg.springboot.model.Token;
import com.lxg.springboot.service.HttpAPIService;
import com.lxg.springboot.util.RandomStringGenerator;
import com.lxg.springboot.util.Signature;
import com.lxg.springboot.util.StreamUtil;
import com.thoughtworks.xstream.XStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import java.io.IOException;

import javax.annotation.Resource;
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

    @RequestMapping("wxpay/prepay")
    public String prepay(String openid, int fee, String info) throws Exception {

		OrderInfo order = new OrderInfo();
		order.setAppid(appid);
		order.setMch_id(mch_id);
		order.setNonce_str(RandomStringGenerator.getRandomStringByLength(32));
		order.setBody(new String(info.getBytes(),"UTF-8"));
		order.setOut_trade_no(RandomStringGenerator.getRandomStringByLength(32));
		order.setTotal_fee(fee);
		order.setSpbill_create_ip("123.57.218.54");
		order.setNotify_url("https://health.lianlianchains.com/wxpay/result");
		order.setTrade_type("JSAPI");
		order.setOpenid(openid);
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

    	String reqParams = StreamUtil.read(request.getInputStream());
    	
    	System.out.println("-------支付结果:"+reqParams);
    	
		StringBuffer sb = new StringBuffer("<xml><return_code>SUCCESS</return_code><return_msg>OK</return_msg></xml>");
		
		response.getWriter().append(sb.toString());
    }
    
}
