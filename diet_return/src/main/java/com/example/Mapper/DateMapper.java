package com.example.Mapper;

import com.example.entity.Diet;
import com.example.entity.NutritionStr;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface DateMapper {

    public List<Diet> date(@Param("id") Integer id,@Param("week") Integer week);

    public NutritionStr component(@Param("name") String name);

}
