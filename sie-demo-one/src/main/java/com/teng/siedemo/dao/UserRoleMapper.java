package com.teng.siedemo.dao;

import com.teng.siedemo.entity.UserRole;

import java.sql.Timestamp;
import java.util.List;
import org.apache.ibatis.annotations.Param;


public interface UserRoleMapper {


    int deleteByPrimaryKey(Long id);

    int insert(UserRole record);

    int updateByPrimaryKeySelective(UserRole record);

    /**
     * 通过username查找用户角色
     * @param username
     * @return
     */
    List<UserRole> queryByUsername(@Param("username") String username);

    /**
     * 通过uid查找用户角色
     * @param userId
     * @return
     */
    List<UserRole> queryByUid(@Param("userId") Long userId);

    /**
     * 查询用户角色没有失效,该角色时间也没失效的数据
     * @param username
     * @param nowtime
     * @return
     */
    List<UserRole> queryRoleStatusByUsername(@Param("username") String username, @Param("nowtime") Timestamp nowtime);

    /**
     * 删除所有roleId相同的数据
     * @param roleId
     * @return
     */
    int deleteAllByroleId(Long roleId);
}