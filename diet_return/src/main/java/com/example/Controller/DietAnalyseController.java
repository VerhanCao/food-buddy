package com.example.Controller;

import com.example.Service.DietAnalyseService;
import com.example.entity.NutritionStr;
import com.example.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DietAnalyseController {
    @Autowired
    DietAnalyseService dietAnalyseService;
    //饮食成分分析
    @RequestMapping("/analyse")
    public Result analyse(Integer id){
        NutritionStr nutritionStr=dietAnalyseService.analyse(id);
        return Result.success(nutritionStr);
    }
}
