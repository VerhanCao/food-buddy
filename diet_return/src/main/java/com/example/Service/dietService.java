package com.example.Service;

import com.example.Mapper.dietMapper;
import com.example.entity.Diet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class dietService {
    @Autowired
    dietMapper dietmapper;

    public String storage(Diet inform)
    {
        dietmapper.record(inform.getStyle(), inform.getName(), inform.getImg(), inform.getUserId(),  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()), inform.getMany(), inform.getEnergy(), inform.getProtein(), inform.getCarbohydrates(), inform.getFat());
        return "success";
    }

    public List<Diet> find(Integer id)
    {
        List<Diet> diet=dietmapper.find(id);
        return diet;
    }

    public List<Diet> queryDiets(String sort) {
        List<Diet> diets = dietmapper.queryDiets(sort);
        return diets;
    }
}
