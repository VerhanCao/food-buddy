package com.example.Service;

import com.example.Mapper.DateMapper;
import com.example.Mapper.chatAdviceMapper;
import com.example.entity.Diet;
import com.example.entity.NutritionStr;
import com.example.entity.Result;
import com.example.entity.UploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class RecommendSevice {
    @Autowired
    chatAdviceMapper chatAdviceMapper;

    @Autowired
    DateMapper dateMapper;

    @Autowired
    UploadProperties uploadProperties;

    public List<String> recommend(Integer id) {
        int week = 1, count;
        List<Diet> diet;
        String inform = "", s1 = "", s2 = "", s3 = "";
        String goal = chatAdviceMapper.goal(id);
        System.out.println("goal:" + goal);
        //字符串拼接
        LocalDateTime now = LocalDateTime.now();
        // 获取DayOfWeek枚举对象，表示星期几
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        int dayOfWeekNumber = dayOfWeek.getValue();

        for (count = 1; count <= dayOfWeekNumber; count++) {
            if (count == 7)
                week = 0;
            diet = dateMapper.date(id, week);
            s1 = "";
            s2 = "";
            s3 = "";
            for (Diet element : diet) {
                if (element.getStyle().equals("早餐")) {
                    s1 += element.getName() + " ";
                } else if (element.getStyle().equals("中餐")) {
                    s2 += element.getName() + " ";
                } else if (element.getStyle().equals("晚餐")) {
                    s3 += element.getName() + " ";
                }
            }
            switch (week++) {
                case 1:
                    inform += "周一：";
                    break;
                case 2:
                    inform += "周二：";
                    break;
                case 3:
                    inform += "周三：";
                    break;
                case 4:
                    inform += "周四：";
                    break;
                case 5:
                    inform += "周五：";
                    break;
                case 6:
                    inform += "周六：";
                    break;
                case 0:
                    inform += "周日：";
                    break;
            }
            inform += "早餐-" + s1 + "," + "午餐-" + s2 + "," + "晚餐-" + s3 + ";";
        }
        System.out.println(inform);

        //营养成分
        String conponent;
        double energy = 0.0, protein = 0.0, carbohydrates = 0.0, fat = 0.0;
        if (dayOfWeekNumber == 7)
            dayOfWeekNumber = 0;
        diet = dateMapper.date(id, dayOfWeekNumber);
        for (Diet element : diet) {
            NutritionStr n = dateMapper.component(element.getName());
            energy += Double.parseDouble(n.getEnergy().replace("kal", ""));
            protein += Double.parseDouble(n.getProtein().replace("克", ""));
            carbohydrates += Double.parseDouble(n.getCarbohydrates().replace("克", ""));
            fat += Double.parseDouble(n.getFat().replace("克", ""));
        }
        //星期三营养摄入：蛋白质：XXX。脂肪：XXX。维生素A：XXX......
        conponent = "今天营养摄入：蛋白质：约" + protein + "g;碳水化合物：约" + carbohydrates + "g;脂肪：约" + fat + "g。";
        System.out.println(conponent);

        //执行py文件
        String idStr = Integer.toString(id);
        String str = "";
        try {
            String[] args1 = new String[]{uploadProperties.getPyload(), "-Wignore", uploadProperties.getJudge(), idStr, goal, inform};
            Process proc = Runtime.getRuntime().exec(args1);
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream(), "UTF-8"));
            str = in.readLine();
            in.close();
            proc.waitFor();
            //System.out.println(proc.waitFor());
            System.out.println("score:" + str);
            List<String> list = new ArrayList<String>();
            Integer score = Integer.parseInt(str.trim());
            if (score < 6) {
                str = "";
                String[] args2 = new String[]{uploadProperties.getPyload(), "-Wignore", uploadProperties.getDishes(), idStr, goal, inform, conponent};
                Process process = Runtime.getRuntime().exec(args2);

                // 获取错误输出流
                BufferedReader err = new BufferedReader(new InputStreamReader(process.getErrorStream(), "UTF-8"));
                String line = null;
                while ((line = err.readLine()) != null) {
                    str += line;
                }
                String[] parts = str.split("<\\|>");
                for(int i=1;i<parts.length;i++){
                    list.add(parts[i]);
                }
                err.close();
                process.waitFor();
                System.out.println(process.waitFor());
                System.out.println("str：" + str);
                System.out.println("list：" + list);
                if (list != null)
                    return list;
                else
                    return null;
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String Expansion(Integer id) throws IOException, InterruptedException {
        String str="";
        String idStr = Integer.toString(id);
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        int dayOfWeekNumber = dayOfWeek.getValue();
        List<Diet> diet=dateMapper.date(id,dayOfWeekNumber);
        for (Diet element : diet){
            System.out.println(element.getName());
            str+="<|>"+idStr+"-"+element.getName();
        }
        System.out.println(str);
        String[] args1 = new String[]{uploadProperties.getPyload(),uploadProperties.getAdd(),idStr, str};
        Process proc = Runtime.getRuntime().exec(args1);
        proc.waitFor();
        System.out.println(proc.waitFor());
        return "success";
    }
}
