package com.teng.siedemo.service;

import com.teng.siedemo.entity.UserRole;

import java.util.List;

public interface UserRoleService {

    /**
     * 修改用户角色
     * @param username
     * @param userId
     * @param roleId
     */
    void updateUserRole(String username, Long userId, Long[] roleId);
}
