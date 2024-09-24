package com.example.Controller;

import com.example.entity.Result;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
@CrossOrigin
public class chatReturnController {
    @RequestMapping("/Diet")
    public Result record() {
        try {
            String[] args1 = new String[] {"E:\\conda\\python.exe","D:\\diet\\dietary-health-program\\llm_server\\chat_response\\base_memory_chat.py"};
            Process proc = Runtime.getRuntime().exec(args1);// 执行py文件
            /*BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream(),"UTF-8"));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            String errorMessage;
            while ((errorMessage = stdError.readLine()) != null) {
                System.out.println("错误信息: " + errorMessage);
            }
            System.out.println(proc);
            String line = null;
            while ((line = in.readLine()) != null) {
               str += line + "<br/>";
            }
            in.close();*/
            proc.waitFor();
            System.out.println(proc.waitFor());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Result.success();
    }

}