package com.example.service.impl;

import com.example.mapper.SysUserMapper;
import com.example.service.SysUserService;
import com.example.utils.*;
import com.example.entity.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import static com.example.utils.QiniuUtil.extractKeyavater;

@Service
public class SysUserServiceImpl implements SysUserService {


    @Lazy
    @Autowired
    private SysUserMapper sysUserMapper;

    @Autowired
    private JwtHelper jwtHelper;


    /**
     * 根据用户名查询用户
     * 1.根据账号，查询用户对象  - loginUser
     * 2.返回loginUser
     *
     * @param username
     * @return
     */

    @Override
    public SysUser getUserbyusername(String username){
        SysUser loginUser=sysUserMapper.selectByaccountNumber(username);
        return loginUser;
    }

    /**
     * 根据用户id查询用户
     * 1.根据id，查询用户对象  - User
     * 2.返回User
     *
     * @param userid
     * @return
     */

    @Override
    public SysUser getUserbyuserid(Integer userid){
        SysUser User=sysUserMapper.selectByid(userid);
        return User;
    }

    @Override
    public void updatapassword(String newpassword){
        int userid=LoginUserInfoHelper.getUserId().intValue();
        sysUserMapper.updatepassword(MD5Util.encrypt(newpassword),userid);
    }

    /**
     * 根据token获取用户数据
     * 1. token是否在有效期
     * 2. 根据token解析userId
     * 3. 根据用户id查询用数据
     * 4. 去掉密码，封装result结果返回即可
     *
     * @param token
     * @return
     */

    @Override
    public Result getUser(String token) {
        //判断token是否过期
        if (jwtHelper.isExpiration(token)) {
            //过期视为未登录处理
            return Result.error("登录已过期");
        }
        //未过期
        int userId = jwtHelper.getUserId(token).intValue();

        SysUser sysUser = sysUserMapper.selectByid(userId);
        sysUser.setAccountPassword("");
        Map data = new HashMap();
        data.put("loginUser", sysUser);

        return Result.success(data);
    }

    /**
     * 检查账号是否可用
     *   1.根据账号进行count查询
     *   2.count == 0 可用
     *   3.count > 0 不可用
     *
     * @param accountNumber 账号
     * @return
     */

    @Override
    public boolean checkUserName(String accountNumber) {
        Long count=sysUserMapper.selectCount(accountNumber);
        //账号不存在
        if (count == 0) {
            return true;
        }
        //账号已存在
        return false;
    }

    /**
     * 用户注册业务
     * 1.依然检查账号是否已经被注册
     * 2.密码加密处理
     * 3.账号数据保存
     * @param sysuser
     * @return
     */

    @Override
    public void regist(SysUser sysuser) {
        //密码加密处理
        sysuser.setAccountPassword(MD5Util.encrypt(sysuser.getAccountPassword()));
        //账号数据保存
        sysuser.setVip(0);
        sysUserMapper.insert(sysuser);
    }

    /**
     * 用户上传头像业务
     * 1.图片上传七牛云
     * 2.获取上传后的文件路径
     * 3.账号数据保存
     * @param file,userId
     * @return
     */

    @Override
    public void uploadImage(MultipartFile file, Integer userId) throws IOException {
        String fileName = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        QiniuUtil util =new QiniuUtil();
        String uploadPath = util.upload(inputStream, fileName);

        sysUserMapper.updateavatar(uploadPath,userId);
    }

    /**
     * 用户删除头像业务
     * 1.提取文件的key
     * 2.删除七牛云上的图片
     * @param userId
     * @return
     */

    @Override
    public void deleteImage(Integer userId){
        SysUser sysUser = sysUserMapper.selectByid(userId);
        String key = extractKeyavater(sysUser.getAvatar());
        QiniuUtil util =new QiniuUtil();
        util.delete(key);
    }
}

