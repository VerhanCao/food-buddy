package com.example.entity;

import lombok.Data;

@Data
public class SysUser {
    private Integer id;

    private String accountNumber;

    private String accountPassword;

    private String avatar;

    private Integer vip;

    private String target;
}
