package com.teng.siedemo.comtroller;

import com.teng.siedemo.service.UserRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserRoleController {
    private Logger log = LoggerFactory.getLogger(UserRoleController.class);
    @Resource
    private UserRoleService userRoleService;

    /**
     * 修改用户拥有的角色
     */
    @PostMapping("/updateUserRole")
    public Object updateUserRole(String username ,Long userId,Long[] roleId) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserRoleController:updateUserRole]update UserRole.");
            userRoleService.updateUserRole(username,userId,roleId);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserRoleController:updateUserRole]fail to updateUserRole.",e);
            map.put("success", false);
        }
        return map;
    }
}
