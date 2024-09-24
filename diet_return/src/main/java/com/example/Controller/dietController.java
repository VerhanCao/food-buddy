package com.example.Controller;

import com.example.Service.dietService;
import com.example.entity.Diet;
import com.example.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class dietController {
    @Autowired
    dietService dietservice;
    //上传并记录饮食信息
    @RequestMapping("/record")
    public Result storage(@RequestBody List<Diet> informs)
    {
        for (Diet inform : informs) {
            System.out.println(informs);
            dietservice.storage(inform);
        }
        return  Result.success();
    }
    //查询饮食记录信息
    @RequestMapping("/queryDietMessage/{id}")
    public Result find(@PathVariable Integer id)
    {
        System.out.println("userld:"+id);
        List<Diet> diet=dietservice.find(id);
        System.out.println(diet);
        return Result.success(diet);
    }

    @GetMapping("/queryDiets")
    public Result queryDiets (String sort) {
        System.out.println("sort" +sort);
        List<Diet> diets = dietservice.queryDiets(sort);
        return Result.success(diets);
    }


}
