package com.teng.siedemo.comtroller;

import com.teng.siedemo.entity.User;
import com.teng.siedemo.service.UserService;
import com.teng.siedemo.util.TokenUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    private Logger log = LoggerFactory.getLogger(UserController.class);
    @Resource
    private UserService userService;

    /**
     * 登录
     * @param username
     * @param password
     * @return
     */
    @GetMapping("/login/{username}/{password}")
    public Object userlogin(HttpServletRequest request, @PathVariable("username") String username, @PathVariable("password") String password){
       Map map = new HashMap<>();
       log.info("用户名:"+username+" 密码:"+password);
       User user = userService.userlogin(username,password);
       if(user != null)
       {
           map.put("code",200);
           map.put("data",user);
           map.put("mytoken", TokenUtils.token(username,password));
       }
       else
       {
           map.put("code",400);
       }
        return map;
    }

    /**
     * 校验用户名是否重复
     */
    @PostMapping("/checkUsername")
    public Object checkUsername(String username) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            log.info("[UserController:checkUsername]check Username.");
            boolean check = userService.checkUsername(username);
            map.put("check",check);
            map.put("success", true);
        } catch (Exception e) {
            log.error("[UserController:checkUsername]fail to check Username.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 分页查询用户数据
     */
    @PostMapping("/queryUserPage")
    public Object queryUserPage(Integer pageSize, Integer pageNumber,User user,String startTime,String overTime ) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserController:querySearchPage]query user.pageSize:"+pageSize+"pageNumber:"+pageNumber);
            map.put("data",userService.queryUserPage((pageNumber - 1) * pageSize, pageSize,user,startTime,overTime));
            map.put("total",userService.countUser(user,startTime,overTime));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserController:querySearchPage]fail to query user.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 添加用户
     */
    @PostMapping("/insertUser")
    public Object insertUser(User user) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserController:insertUser]insert user.data:"+user+"");
            userService.insertUser(user);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserController:insertUser]fail to insert user.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 删除用户
     */
    @PostMapping("/deleteUser")
    public Object deleteUser(Long[] uid) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserController:deleteUser]delete user.");
            userService.deleteUser(uid);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserController:deleteUser]fail to delete user.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 修改用户
     */
    @PostMapping("/updateUser")
    public Object updateUser(User user) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserController:updateUser]update user.data:"+user);
            userService.updateUser(user);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserController:updateUser]fail to update user.",e);
            map.put("success", false);
        }
        return map;
    }
}
