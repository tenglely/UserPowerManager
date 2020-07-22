package com.teng.siedemo.comtroller;

import com.teng.siedemo.entity.Role;
import com.teng.siedemo.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RoleController {
    private Logger log = LoggerFactory.getLogger(RoleController.class);
    @Resource
    private RoleService roleService;


    /**
     * 查询用户所拥有的所有角色
     */
    @GetMapping("/queryAllUserRoleByUsername/{username}")
    public Object queryAllUserRoleByUsername(@PathVariable("username") String username) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[UserRoleController:queryAllUserRoleByUsername]query All UserRole By Username.");
            map.put("data",roleService.queryAllRoleByUsername(username));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[UserRoleController:queryAllUserRoleByUsername]fail to query All UserRole By Username.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 删除旧有数据，更新角色权限
     */
    @PostMapping("/updateRolePowers")
    public Object updateRolePowers(Long[] menuIdList,Long roleId) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:updateRolePowers]");
            roleService.updateRolePowers(menuIdList,roleId);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[:updateRolePowers]fail to .",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 查询所有角色
     */
    @GetMapping("/queryAllRole")
    public Object queryAllRole() {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:queryAllRole]query All Role.");
            map.put("data",roleService.queryAllRoles());
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:queryAllRole]fail to query All Role.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 查询角色所拥有的的权限
     */
    @GetMapping("/queryRolePowers/{id}")
    public Object queryRolePowers(@PathVariable("id") Long id) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:queryRolePowers]query Role Powers.[id:"+id+":]");
            map.put("data",roleService.queryRolePowerById(id));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:queryRolePowers]fail to query Role Powers.[id:"+id+":]",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 分页查询角色
     */
    @PostMapping("/queryRolePage")
    public Object queryRolePage(Integer pageSize, Integer pageNumber, Role role) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:queryRolePage] query role success.");
            map.put("data",roleService.queryRolePage((pageNumber - 1) * pageSize, pageSize,role));
            map.put("total",roleService.countRole(role));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:queryRolePage]fail to query role.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 添加
     */
    @PostMapping("/insertRole")
    public Object insertRole(Role role) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:insertRole]insert role.data:"+role+"");
            roleService.insertRole(role);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:insertRole]fail to insert role.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 删除
     */
    @PostMapping("/deleteRole")
    public Object deleteUser(Long[] rid) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:deleteRole]delete role.");
            roleService.deleteRole(rid);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:deleteRole]fail to delete role.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 修改
     */
    @PostMapping("/updateRole")
    public Object updateUser(Role role) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[RoleController:updateRole]update user.data:"+role);
            roleService.updateRole(role);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[RoleController:updateUser]fail to update Role.",e);
            map.put("success", false);
        }
        return map;
    }

}
