package com.example.config;


import com.example.interceptors.LoginProtectInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @program: springboot
 * @description: 配置拦截器
 **/

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private LoginProtectInterceptor loginProtectInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginProtectInterceptor).addPathPatterns("/user/getUserInfo","/user/checkLogin","/user/updatapassword","/user/uploadimg","/user/updataimg");
    }
}
