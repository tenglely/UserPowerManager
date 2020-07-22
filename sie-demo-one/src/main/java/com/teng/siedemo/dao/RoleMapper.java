package com.teng.siedemo.dao;

import com.teng.siedemo.entity.Role;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RoleMapper {

    int deleteByPrimaryKey(Long id);

    int insertSelective(Role record);

    int updateByPrimaryKeySelective(Role record);

    /**
     * 根据id查询
     * @param id
     * @return
     */
    Role queryRoleById(@Param("id") Long id);

    /**
     * 分页查询角色
     * @param start
     * @param pageSize
     * @param role
     * @return
     */
    List<Role> queryRolePage(@Param("start") Integer start,
                             @Param("pageSize") Integer pageSize,
                             @Param("role") Role role);

    /**
     * 分页查询角色数目
     * @param role
     * @return
     */
    Integer countRole(@Param("role") Role role);

    /**
     * 查询所有角色
     * @return
     */
    List<Role> queryAllRoles();

    /**
     * 查询用户所有角色
     * @param username
     * @return
     */
    List<Role> queryAllRoleByUsername(@Param("username") String username);
}