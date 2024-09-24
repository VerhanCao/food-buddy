package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NutritionStr {
    private String energy;
    private String protein;
    private String carbohydrates;
    private String fat;
}
