package com.teng.siedemo.service;

import com.teng.siedemo.entity.User;

import java.util.List;

public interface UserService {
    /**
     * 用户登录
     * @param username
     * @param password
     * @return
     */
    public User userlogin(String username,String password);

    /**
     * 分页查询用户数据
     * @param start
     * @param pageSize
     * @param user
     * @param startTime
     * @param overTime
     * @return
     */
    List<User> queryUserPage(Integer start, Integer pageSize, User user, String startTime, String overTime);

    /**
     * 分页数目
     * @param user
     * @param startTime
     * @param overTime
     * @return
     */
    Integer countUser(User user, String startTime, String overTime);

    /**
     * 添加
     * @param user
     */
    int insertUser(User user) throws Exception;

    void deleteUser(Long[] uid);

    int updateUser(User user) throws Exception;

    /**
     * 校验用户名是否重复
     * @param username
     * @return
     */
    boolean checkUsername(String username);
}
