package com.example.mapper;


import com.example.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysUserMapper {

        SysUser selectByaccountNumber(@Param("accountNumber") String accountNumber);

        SysUser selectByid(@Param("id") Integer id);

        Long selectCount(String accountNumber);

        List<SysUser> selectAll();

        void insert(SysUser user);

        void updatepassword(String accountPassword,Integer id);

        void updateavatar(String avatar,Integer id);

        void deleteByaccountNumber(String accountNumber);

}
