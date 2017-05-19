package com.lxg.springboot.controller;

import com.lxg.springboot.http.HttpAPIService;
import com.lxg.springboot.http.HttpResult;
import com.lxg.springboot.util.CheckSumBuilder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

/**
 * Created by zhenghong
 * on 2017/4/25.
 */
@RestController
public class HttpClientController {

	@Resource
    private HttpAPIService httpAPIService;

    @RequestMapping("sms/send")
    public String smssend(String mobile) throws Exception {

    	 String url = "https://api.netease.im/sms/sendcode.action";
    	 String appKey = "13fc1bfbe1a16fdebd4017b4c8ef7a35";
         String appSecret = "c763e0929691";
         String nonce =  "609600";
         String curTime = String.valueOf((new Date()).getTime() / 1000L);
         String checkSum = CheckSumBuilder.getCheckSum(appSecret, nonce ,curTime);
         
         // 参数
         HashMap<String, Object> map = new HashMap<String, Object>();
         map.put("mobile", mobile);
         map.put("templateid", 3052353);
           
         // 请求头
         HashMap<String, Object> header = new HashMap<String, Object>();
         header.put("AppKey", appKey);
         header.put("Nonce", nonce);
         header.put("CurTime", curTime);
         header.put("CheckSum", checkSum);
         
         HttpResult res = httpAPIService.doPost(url, map, header);
         
         return res.getBody();
    	
    }
    
    @RequestMapping("sms/verify")
    public String smsverify(String mobile, String code) throws Exception {

    	 String url = "https://api.netease.im/sms/verifycode.action";
    	 String appKey = "13fc1bfbe1a16fdebd4017b4c8ef7a35";
         String appSecret = "c763e0929691";
         String nonce =  "609600";
         String curTime = String.valueOf((new Date()).getTime() / 1000L);
         String checkSum = CheckSumBuilder.getCheckSum(appSecret, nonce ,curTime);
         
         // 参数
         HashMap<String, Object> map = new HashMap<String, Object>();
         map.put("mobile", mobile);
         map.put("code", code);
           
         // 请求头
         HashMap<String, Object> header = new HashMap<String, Object>();
         header.put("AppKey", appKey);
         header.put("Nonce", nonce);
         header.put("CurTime", curTime);
         header.put("CheckSum", checkSum);
         
         HttpResult res = httpAPIService.doPost(url, map, header);
         
         return res.getBody();
    	
    }
    
    
}
