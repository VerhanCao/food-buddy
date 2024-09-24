package com.example.Mapper;

import com.example.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {

    User login(@Param("number") String number, @Param("password") String password);

    void resist(@Param("number") String number, @Param("password") String password, @Param("avatar") String avatar, @Param("target") String target);
}
