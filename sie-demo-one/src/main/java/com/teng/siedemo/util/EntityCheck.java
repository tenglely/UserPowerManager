package com.teng.siedemo.util;

import com.teng.siedemo.entity.User;

/**
 * 插入、修改时，校验实体对象
 */
public class EntityCheck {

    /**
     * 校验user对象属性是否为空或符合规范
     * @param user
     * @throws Exception
     */
    public static void UserCheck(User user) throws Exception {
        if(user == null)
        {
            throw new Exception("user对象为空!!!");
        }
        if(user.getUsername()==null)
        {
            throw new Exception("用户名为空!!!");
        }
        if(user.getName()==null)
        {
            throw new Exception("姓名为空!!!");
        }
        if(user.getPassword()==null)
        {
            throw new Exception("密码为空!!!");
        }
        if(user.getSex()==null)
        {
            throw new Exception("性别为空!!!");
        }
        if(user.getUserStatus()==null)
        {
            throw new Exception("用户状态为空!!!");
        }
    }
}
