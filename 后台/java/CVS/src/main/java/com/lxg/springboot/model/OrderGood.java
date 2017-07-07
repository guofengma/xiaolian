package com.lxg.springboot.model;

import java.io.Serializable;

public class OrderGood implements Serializable {

	/**
	 * author xuhuadong
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;

	private String orderNo;
	
	private int amount;
	

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}


	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	
}