package com.example.controller;

import com.example.utils.Result;
import com.example.entity.SysUser;
import com.example.service.SysUserService;
import com.example.utils.JwtHelper;
import com.example.utils.LoginUserInfoHelper;
import com.example.utils.MD5Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user")
@CrossOrigin
@Api(tags = "用户管理")
public class SysUserController {
    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private JwtHelper jwtHelper;


    //登录
    @PostMapping("/login")
    @ApiOperation("登录接口")
    public Result login(String username,String password) {
        SysUser loginUser = sysUserService.getUserbyusername(username);
        //如果用户不存在则用户名错误
        if (loginUser == null) {
            return Result.error("用户名错误");
        }
        //账号正确，对比密码(密码正确)
        if (!StringUtils.isEmpty(password)
                && MD5Util.encrypt(password).equals(loginUser.getAccountPassword())) {
            //根据用户id创建token
            String token = jwtHelper.createToken(Long.valueOf(loginUser.getId()));
            Map data = new HashMap<>();
            data.put("token", token);
            data.put("id",loginUser.getId());
            return Result.success(data);
        }
        //账号正确，对比密码(密码错误)
        return Result.error("密码错误");
    }

    //获取用户数据
    @GetMapping("/getUserInfo")
    @ApiOperation("获取用户数据")
    public Result getUserInfo(@RequestHeader String token) {
        Result result = sysUserService.getUser(token);
        return result;
    }

    //用户注册
    @PostMapping("/regist")
    @ApiOperation("用户注册")
    public Result regist(String username,String password){
        //注册用户名检查
        boolean checkresult = sysUserService.checkUserName(username);
        if(checkresult){
            SysUser sysUser = new SysUser();
            sysUser.setAccountNumber(username);
            sysUser.setAccountPassword(password);
            sysUserService.regist(sysUser);
            return Result.success();
        }else {
            return Result.error("用户名已被使用");
        }
    }

    //登录检查
    @GetMapping("/checkLogin")
    @ApiOperation("登录检查")
    public Result checkLogin(@RequestHeader String token){
        int userid=LoginUserInfoHelper.getUserId().intValue();
        //登录已过期
        if (jwtHelper.isExpiration(token)){
            return Result.error("登录已过期");
        }
        //登录未过期
        return Result.success();
    }

    //更改密码
    @PatchMapping("/updatapassword")
    @ApiOperation("更改密码")
    public Result updatePassword(@RequestHeader String token,String oldpassword,String newpassword,String repassword) {


        int userid=LoginUserInfoHelper.getUserId().intValue();
        SysUser user =sysUserService.getUserbyuserid(userid);
        if(!MD5Util.encrypt(oldpassword).equals(user.getAccountPassword())) {
            return Result.error("原密码错误");
        }
        if(!newpassword.equals(repassword)){
            return Result.error("新密码和确认密码不一致");
        }
        sysUserService.updatapassword(newpassword);
        return Result.success();
    }

    //头像上传
    @PostMapping("/uploadimg")
    @ResponseBody
    public Result uploadimg(@RequestHeader String token,@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return Result.error("");
        }
        int userid=LoginUserInfoHelper.getUserId().intValue();
        sysUserService.uploadImage(file,userid);
        return Result.success();
    }

    //头像更新
    @PostMapping("/updataimg")
    @ResponseBody
    public Result updataimg(@RequestHeader String token,@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        int userid=LoginUserInfoHelper.getUserId().intValue();
        sysUserService.deleteImage(userid);
        sysUserService.uploadImage(file,userid);
        return Result.success();
    }

}