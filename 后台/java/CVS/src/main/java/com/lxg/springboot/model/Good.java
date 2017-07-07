package com.lxg.springboot.model;

import java.io.Serializable;

public class Good implements Serializable {

	/**
	 * author xuhuadong
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String name;

	private String specifi;

	private String code;
	
	private String price;
	
	private int amount;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSpecifi() {
		return specifi;
	}

	public void setSpecifi(String specifi) {
		this.specifi = specifi;
	}

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

	
}