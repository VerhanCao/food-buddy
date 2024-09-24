package com.example.Controller;

import com.example.Controller.request.LoginRequest;
import com.example.Service.LoginService;
import com.example.entity.Result;
import com.example.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("")
@CrossOrigin
@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public Result login(@RequestBody LoginRequest loginRequest) {
        User user = loginService.login(loginRequest);
        if (user == null) {
            return Result.error("登录失败");
        }
        return Result.success();
    }

    @PostMapping("/resist")
    public Result resist(@RequestBody LoginRequest loginRequest) {
        User user = loginService.login(loginRequest);
        if (user != null) {
            return Result.error("账号已经存在");
        }
        loginService.resist(loginRequest);
        return Result.success();
    }

}
