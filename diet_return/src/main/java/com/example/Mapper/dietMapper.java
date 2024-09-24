package com.example.Mapper;


import com.example.entity.Diet;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface dietMapper {


    public List<Diet> find(@Param("id") Integer id);

    List<Diet> queryDiets(@Param("sort") String sort);


    void record(@Param("style") String style, @Param("name") String name, @Param("img") String img, @Param("userId") Integer userId, @Param("time") String time, @Param("many") Integer many, @Param("energy") String energy, @Param("protein") String protein, @Param("carbohydrates") String carbohydrates, @Param("fat") String fat);
    /*@Select("select distinct id, phone, email, user_name as userName, password, sex from diet_record where phone = #{phone} and password = #{password}")
    Diet dietfind(@Param("phone") String phone, @Param("password") String password, @Param("role") String role);*/


}
