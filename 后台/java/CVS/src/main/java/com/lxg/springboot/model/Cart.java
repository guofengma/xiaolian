package com.lxg.springboot.model;

import java.io.Serializable;

public class Cart implements Serializable {

	/**
	 * author xuhuadong
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;

	private String openid;
	
	private int amount;
	

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
}