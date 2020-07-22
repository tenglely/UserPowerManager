package com.teng.siedemo.service;

import com.teng.siedemo.entity.Role;

import java.util.List;

public interface RoleService {
    /**
     * 分页查角色
     * @param start
     * @param pageSize
     * @param role
     * @return
     */
    List<Role> queryRolePage(Integer start, Integer pageSize, Role role);

    /**
     * 分页查询角色数目
     * @param role
     * @return
     */
    Integer countRole(Role role);

    /**
     * 根据角色id查询所有权限
     * @param id
     * @return
     */
    List<Long> queryRolePowerById(Long id);

    /**
     * 删除旧有数据，更新角色权限
     * @param menuIdList
     * @param roleId
     */
    void updateRolePowers(Long[] menuIdList, Long roleId);

    /**
     * 查询所有角色
     * @return
     */
    List<Role> queryAllRoles();

    /**
     * 添加角色
     * @param role
     */
    Integer insertRole(Role role);

    /**
     * 删除角色
     * @param rid
     */
    void deleteRole(Long[] rid);

    /**
     * 修改
     * @param role
     */
    int updateRole(Role role);

    /**
     * 查询用户所拥有的的所有角色
     * @param username
     * @return
     */
    List<Role> queryAllRoleByUsername(String username);
}
