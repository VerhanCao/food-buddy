package com.example.Controller.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String number;
    private String password;
    private String avatar;
    private String target;
}
