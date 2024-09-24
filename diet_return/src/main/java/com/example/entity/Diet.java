package com.example.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diet {
    private Integer id;
    private String style;
    private String name;
    private Integer userId;
    private LocalDateTime time;
//    private Integer source;
    private String img;
    private String protein;
    private String carbohydrates;
    private String fat;
    private String energy;
    private Integer many;
}
