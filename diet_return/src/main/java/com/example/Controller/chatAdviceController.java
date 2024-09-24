package com.example.Controller;


import com.example.Service.chatAdviceService;
import com.example.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
public class chatAdviceController {
    @Autowired
    chatAdviceService chatadviceservice;

    @RequestMapping("/dietAdvice")
    public Result record(Integer id, String key) {
        System.out.println(id+" "+key);
        String str=chatadviceservice.advice(id,key);
        System.out.println(str);
        return Result.success(str);
    }

}