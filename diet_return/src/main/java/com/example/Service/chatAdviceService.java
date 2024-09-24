package com.example.Service;

import com.example.Mapper.chatAdviceMapper;
import com.example.entity.UploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class chatAdviceService {

    @Autowired
    chatAdviceMapper chatadvicemapper;

    @Autowired
    UploadProperties uploadProperties;

    public String advice(Integer id,String key){
        System.out.println(uploadProperties.getPyload());
        System.out.println(uploadProperties.getAdvice());
        String goal=chatadvicemapper.goal(id);
        System.out.println(goal);
        String idStr=Integer.toString(id);
        String str = "";
        try {
            String[] args1 = new String[] {uploadProperties.getPyload(),"-Wignore",uploadProperties.getAdvice(),idStr,goal,key};
            Process proc = Runtime.getRuntime().exec(args1);// 执行py文件
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream(),"UTF-8"));
            String line = null;
            while ((line = in.readLine()) != null) {
                str += line;
            }
            in.close();
            proc.waitFor();
            System.out.println(proc.waitFor());

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return str;

    }
}
