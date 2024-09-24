package com.example.Service;

import com.example.Mapper.DateMapper;
import com.example.Mapper.dietMapper;
import com.example.entity.Diet;
import com.example.entity.NutritionStr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DietAnalyseService {
    @Autowired
    DateMapper dateMapper;

    @Autowired
    dietMapper dietmapper;

    public NutritionStr analyse(Integer id){
        double energy = 0.0, protein = 0.0, carbohydrates = 0.0, fat = 0.0;
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        int dayOfWeekNumber = dayOfWeek.getValue();
        List<Diet> diet=dateMapper.date(id,dayOfWeekNumber);
        for (Diet element : diet) {
            System.out.println(element.getName());
            NutritionStr n = dateMapper.component(element.getName());
            energy += Double.parseDouble(n.getEnergy().replace("kal", ""));
            protein += Double.parseDouble(n.getProtein().replace("克", ""));
            carbohydrates += Double.parseDouble(n.getCarbohydrates().replace("克", ""));
            fat += Double.parseDouble(n.getFat().replace("克", ""));
        }
        NutritionStr nutritionStr=new NutritionStr();
        //String formattedValue = String.format("%.1f", value)
        nutritionStr.setEnergy(String.format("%.1f", energy));
        nutritionStr.setProtein(String.format("%.1f", protein));
        nutritionStr.setCarbohydrates(String.format("%.1f", carbohydrates));
        nutritionStr.setFat(String.format("%.1f", fat));
        System.out.println("energy:"+energy+";protein:"+protein+";carbohydrates:"+carbohydrates+";fat:"+fat);
        return  nutritionStr;
    }
}
