package com.teng.siedemo.service.impl;

import com.teng.siedemo.dao.UserRoleMapper;
import com.teng.siedemo.entity.UserRole;
import com.teng.siedemo.service.UserRoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {
    @Resource
    private UserRoleMapper userRoleMapper;

    @Transactional
    @Override
    public void updateUserRole(String username, Long userId, Long[] roleId) {
        //查出原有角色
        List<UserRole> userRoleList = userRoleMapper.queryByUsername(username);
        //删除原有角色
        if(userRoleList!=null)
        {
            for(UserRole userRole:userRoleList)
            {
                userRoleMapper.deleteByPrimaryKey(userRole.getId());
            }
        }
        //添加新角色
        for(Long rid:roleId)
        {
            UserRole userRole = new UserRole();
            userRole.setUsername(username);
            userRole.setUserId(userId);
            userRole.setRoleId(rid);
            userRoleMapper.insert(userRole);
        }
    }
}
