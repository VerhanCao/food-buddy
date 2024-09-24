package com.example.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface chatAdviceMapper {

    public String goal(@Param("id") Integer id);

}
