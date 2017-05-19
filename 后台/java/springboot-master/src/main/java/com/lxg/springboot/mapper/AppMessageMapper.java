package com.lxg.springboot.mapper;

import java.util.List;

import com.lxg.springboot.bean.AppMessage;

public interface AppMessageMapper {

    int deleteByPrimaryKey(String id);

    int insert(AppMessage record);

    int insertSelective(AppMessage record);

    AppMessage selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AppMessage record);

    int updateByPrimaryKey(AppMessage record);
    
    List<AppMessage> selectAll();

    List<AppMessage> getMessById(String id);
}