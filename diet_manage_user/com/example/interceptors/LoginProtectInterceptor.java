package com.example.interceptors;

import com.example.utils.JwtHelper;
import com.example.utils.LoginUserInfoHelper;
import com.example.utils.Result;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * projectName: com.example.interceptors
 *
 * description: 登录包含拦截器，检查请求头是否包含有效token
 *    有，有效。 放行
 *    没有，无效，返回504
 */

@Component
public class LoginProtectInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtHelper jwtHelper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //从请求头中获取token
        String token = request.getHeader("token");
        //是否有效
        boolean expiration = jwtHelper.isExpiration(token);
        //有效则放行
        if(!expiration){
            int userId = jwtHelper.getUserId(token).intValue();
            LoginUserInfoHelper.setUserId(Long.valueOf(userId));
            return true;
        }
        response.setStatus(401);
        return false;
    }
}
