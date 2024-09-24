package com.example.service;

import com.example.entity.SysUser;
import com.example.utils.Result;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SysUserService {


    SysUser getUserbyusername(String username);

    SysUser getUserbyuserid(Integer userid);


    void updatapassword(String newpassword);

    Result getUser(String token);

    boolean checkUserName(String accountNumber);

    void regist(SysUser sysuser);

    void uploadImage(MultipartFile file, Integer userId) throws IOException;

    void deleteImage(Integer userId);
}
