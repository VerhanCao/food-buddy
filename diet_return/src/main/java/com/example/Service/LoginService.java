package com.example.Service;

import com.example.Controller.request.LoginRequest;
import com.example.Mapper.LoginMapper;
import com.example.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginMapper loginMapper;

    public User login(LoginRequest loginRequest) {
        return loginMapper.login(loginRequest.getNumber(), loginRequest.getPassword());
    }

    public void resist(LoginRequest loginRequest) {
        loginMapper.resist(loginRequest.getNumber(), loginRequest.getPassword(), loginRequest.getAvatar(), loginRequest.getTarget());
    }
}
