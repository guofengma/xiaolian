package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.model.Good;

public interface GoodMapper {
		
	List<Good> queryall();
	
	Good query(Good good);
	
	Good querybyCode(Good good);
	
}