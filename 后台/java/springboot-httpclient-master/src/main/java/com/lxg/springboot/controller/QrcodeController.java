package com.lxg.springboot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lxg.springboot.http.MatrixToImageWriter;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhenghong
 * on 2017/4/25.
 */
@RestController
public class QrcodeController {

    @RequestMapping("qrcode")
    public void qrcode(String mobile, String chaincodeID, HttpServletResponse response, Integer width, Integer height) throws Exception {

    	String mes = mobile + "|" + chaincodeID;
	    MatrixToImageWriter.createRqCode(mes, width, height, response.getOutputStream());
    	
    }
    
}
