package com.teng.siedemo.service.impl;

import com.teng.siedemo.dao.RoleMapper;
import com.teng.siedemo.dao.RolePowerMapper;
import com.teng.siedemo.dao.UserRoleMapper;
import com.teng.siedemo.entity.Role;
import com.teng.siedemo.entity.RolePower;
import com.teng.siedemo.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Resource
    private RoleMapper roleMapper;
    @Resource
    private RolePowerMapper rolePowerMapper;
    @Resource
    private UserRoleMapper userRoleMapper;

    @Override
    public List<Role> queryRolePage(Integer start, Integer pageSize, Role role) {
        return roleMapper.queryRolePage(start,pageSize,role);
    }

    @Override
    public List<Role> queryAllRoleByUsername(String username) {
        return roleMapper.queryAllRoleByUsername(username);
    }

    @Override
    public int updateRole(Role role) {
        return roleMapper.updateByPrimaryKeySelective(role);
    }

    @Override
    @Transactional
    public void deleteRole(Long[] rid) {
        for(Long id :rid)
        {
            //删除角色
            roleMapper.deleteByPrimaryKey(id);
            //删除角色菜单关联表数据
            rolePowerMapper.deleteByRoleid(id);
           //删除用户角色关联表数据
            userRoleMapper.deleteAllByroleId(id);
        }
    }

    @Override
    @Transactional
    public Integer insertRole(Role role) {
        return roleMapper.insertSelective(role);
    }

    @Override
    public List<Role> queryAllRoles() {
        return roleMapper.queryAllRoles();
    }

    @Override
    public void updateRolePowers(Long[] menuIdList, Long roleId) {
        rolePowerMapper.deleteByRoleid(roleId);
        for(Long menuId : menuIdList)
        {
            RolePower rolePower = new RolePower();
            rolePower.setMenuId(menuId);
            rolePower.setRoleId(roleId);
            rolePowerMapper.insertSelective(rolePower);
        }
    }

    @Override
    public List<Long> queryRolePowerById(Long id) {
        List<RolePower> rolePowerList = rolePowerMapper.queryRolePowerById(id);
        List<Long> data = new ArrayList<>();
        for(RolePower rolePower : rolePowerList)
        {
            data.add(rolePower.getMenuId());
        }
        return data;
    }

    @Override
    public Integer countRole(Role role) {
        return roleMapper.countRole(role);
    }
}
