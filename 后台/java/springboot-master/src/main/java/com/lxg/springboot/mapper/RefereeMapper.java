package com.lxg.springboot.mapper;

import com.lxg.springboot.model.Referee;

public interface RefereeMapper {
	
	int save(Referee referee);
	
	String updatereferee(String openid);
	
	String queryreferee(String openid);
	
}