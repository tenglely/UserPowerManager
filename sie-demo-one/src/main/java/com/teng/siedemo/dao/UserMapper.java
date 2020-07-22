package com.teng.siedemo.dao;

import com.teng.siedemo.entity.User;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    User userlogin(@Param("username") String username);

    int deleteByPrimaryKey(Long id);

    int insertSelective(User record);

    int updateByPrimaryKeySelective(User record);

    /**
     * 分页查询
     * @param start
     * @param pageSize
     * @param user
     * @param startTime
     * @param overTime
     * @return
     */
    List<User> queryUserPage(@Param("start") Integer start,
                             @Param("pageSize") Integer pageSize,
                             @Param("user") User user,
                             @Param("startTime") String startTime,
                             @Param("overTime") String overTime);

    /**
     * 分页查询数目
     * @param user
     * @param startTime
     * @param overTime
     * @return
     */
    Integer countUser(@Param("user") User user, @Param("startTime") String startTime,
                      @Param("overTime") String overTime);
}