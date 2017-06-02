package com.lxg.springboot.model;

import java.io.Serializable;

public class Referee implements Serializable {

	/**
	 * author zhenghong@xrfinance.com
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String openid;

	private String referee1;

	private String referee2;

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getReferee1() {
		return referee1;
	}

	public void setReferee1(String referee1) {
		this.referee1 = referee1;
	}

	public String getReferee2() {
		return referee2;
	}

	public void setReferee2(String referee2) {
		this.referee2 = referee2;
	}

	@Override
	public String toString() {
		return "Referee [openid=" + openid + ", referee1=" + referee1 + ", referee2=" + referee2 + "]";
	}
}