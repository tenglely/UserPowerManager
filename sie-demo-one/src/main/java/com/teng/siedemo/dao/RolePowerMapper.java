package com.teng.siedemo.dao;

import com.teng.siedemo.entity.RolePower;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RolePowerMapper {


    int deleteByPrimaryKey(Long id);

    int insertSelective(RolePower record);

    int updateByPrimaryKeySelective(RolePower record);

    /**
     * 根据角色id查询所有权限
     * @param roleId
     * @return
     */
    List<RolePower> queryRolePowerById(@Param("roleId") Long roleId);

    /**
     * 根据roleId删除
     * @param roleId
     * @return
     */
    int deleteByRoleid(@Param("roleId") Long roleId);
}