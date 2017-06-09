package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.model.Diagnosis;

public interface DiagnosisMapper {

	int save(Diagnosis diagnosis);

	Diagnosis query(Diagnosis diagnosis);
	
	List<Diagnosis> querybypage(Diagnosis diagnosis);
	
	int querytotalpage();
	
	List<Diagnosis> querybypageopenid(Diagnosis diagnosis);
	
	int querytotalpageopenid(String openid);	
	
}