package com.example.Controller;

import com.example.Service.RecommendSevice;
import com.example.entity.Diet;
import com.example.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class RecommendController {

    @Autowired
    RecommendSevice recommendSevice;

    @RequestMapping("/recommend")
    public Result Recommend(Integer id){
        System.out.println("id:"+id);
        List<String> str=recommendSevice.recommend(id);
        if(str!=null)
            return Result.success(str);
        else
            return Result.success();
    }

    @RequestMapping("/addDishes")
    public Result Expansion(Integer id) throws IOException, InterruptedException {
        System.out.println("id:"+id);
        String res=recommendSevice.Expansion(id);
        return Result.success(res);
    }
}
