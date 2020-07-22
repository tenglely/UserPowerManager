package com.teng.siedemo.service.impl;

import com.teng.siedemo.dao.RoleMapper;
import com.teng.siedemo.dao.UserMapper;
import com.teng.siedemo.dao.UserRoleMapper;
import com.teng.siedemo.entity.Role;
import com.teng.siedemo.entity.User;
import com.teng.siedemo.entity.UserRole;
import com.teng.siedemo.service.UserService;
import com.teng.siedemo.util.EntityCheck;
import com.teng.siedemo.util.MD5;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.teng.siedemo.util.MD5.MD5X2;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;
    @Resource
    private UserRoleMapper userRoleMapper;
    @Resource
    private RoleMapper roleMapper;

    @Override
    public User userlogin(String username, String password) {
        //查询用户是否存在，状态是否有效
        User user = userMapper.userlogin(username);
        if(user!=null)
        {
            //验证密码
            Boolean check = MD5.MD5X2Verification(password,user.getPassword());
            if(check)
            {
                //验证用户角色是否失效及该角色时间是否失效
                Timestamp nowtime = new Timestamp(System.currentTimeMillis());
                List<UserRole> userRoleList = userRoleMapper.queryRoleStatusByUsername(username,nowtime);
                if(userRoleList!=null&&!userRoleList.isEmpty())
                {
                    return user;
                }
                return null;
            }
        }
        return null;
    }

    @Override
    public List<User> queryUserPage(Integer start, Integer pageSize, User user, String startTime, String overTime) {
        return userMapper.queryUserPage(start,pageSize,user,startTime,overTime);
    }

    @Override
    public boolean checkUsername(String username) {
        User user = userMapper.userlogin(username);
        if(user!=null){
            return false;
        }
        return true;
    }

    @Override
    public int updateUser(User user) throws Exception {
        //查询用户是否存在
        User userCheck = userMapper.userlogin(user.getUsername());
        if(userCheck!=null)
        {
            throw new Exception("用户名重复!!!");
        }
        if(user.getPassword()!=null)
        {
            user.setPassword(MD5X2(user.getPassword()));
        }
        //修改用户角色表关联数据的用户名
        List<UserRole> userRoleList = userRoleMapper.queryByUid(user.getId());
        for(UserRole userRole : userRoleList)
        {
            userRole.setUsername(user.getUsername());
            userRoleMapper.updateByPrimaryKeySelective(userRole);
        }
        //修改用户表数据
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long[] uid) {
        for(Long id : uid)
        {
            //删除user
            userMapper.deleteByPrimaryKey(id);
            //删除user关联用户角色表数据
            List<UserRole> list = userRoleMapper.queryByUid(id);
            if(list!=null)
            {
                for(UserRole userRole : list)
                {
                    userRoleMapper.deleteByPrimaryKey(userRole.getId());
                }
            }
        }
    }

    @Override
    @Transactional
    public int insertUser(User user) throws Exception {
        //查询用户是否存在
        User userCheck = userMapper.userlogin(user.getUsername());
        if(userCheck!=null)
        {
            throw new Exception("用户名重复!!!");
        }
        //创建时间
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
        user.setCreateTime(timeStamp);
        user.setPassword(MD5X2(user.getPassword()));//MD5加密
        return userMapper.insertSelective(user);
    }

    @Override
    public Integer countUser(User user, String startTime, String overTime) {
        return userMapper.countUser(user,startTime,overTime);
    }
}
