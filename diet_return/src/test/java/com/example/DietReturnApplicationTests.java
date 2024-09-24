package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootTest
class DietReturnApplicationTests {

    @Test
    void contextLoads() {
//        String str = "";
//        String idStr = "1";
//        String goal = "减肥到100斤";
//        String inform = "星期一：早餐：,午餐：,晚餐：;星期二：早餐：艾菜 ,午餐：八角 扒鸡 ,晚餐：白菜";
//        String conponent = "今天营养摄入：蛋白质：36.8克。碳水化合物：36.7克。脂肪：17.2克。";
//        String[] args2 = new String[]{"D:\\python\\python.exe", "D:\\diet\\dietary-health-program\\llm_server\\recommended_dishes\\recommended_dishes.py", idStr, goal, inform, conponent};
//        // ...（省略了上面的代码）
//
//        try {
//            Process process = Runtime.getRuntime().exec(args2);
//
//            // 获取标准输出流
//            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
//            String line;
//            while ((line = in.readLine()) != null) {
//                str += line + "<br/>";
//            }
//            in.close();
//
//            // 获取错误输出流
//            BufferedReader err = new BufferedReader(new InputStreamReader(process.getErrorStream(), "UTF-8"));
//            String errorLine;
//            while ((errorLine = err.readLine()) != null) {
//                str += errorLine + "<br/>";
//            }
//            err.close();
//
//            int exitCode = process.waitFor();
//            System.out.println("Exit Code: " + exitCode);
//            System.out.println("Output: " + str);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        String line = "星期一-早餐-水煮蛋";
        Pattern pattern = Pattern.compile("星期[一|二|三|四|五|六|日]-[早|午|晚]餐-[\\u4e00-\\u9fa5]+");
        Matcher matcher = pattern.matcher(line);
        if (matcher.matches() == true) {
            System.out.println(line);
        }
        System.out.println(false);

    }

}
