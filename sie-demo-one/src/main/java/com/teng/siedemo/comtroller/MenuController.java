package com.teng.siedemo.comtroller;

import com.teng.siedemo.entity.Menu;
import com.teng.siedemo.service.MenuService;
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
public class MenuController {
    private Logger log = LoggerFactory.getLogger(MenuController.class);
    @Resource
    private MenuService menuService;

    /**
     * 查询角色菜单列表
     */
    @GetMapping("/queryHasMenu/{username}")
    public Object queryHasMenu(@PathVariable("username") String username) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:queryHasMenu]query Has Menu.");
            map.put("data",menuService.queryHasMenu(username));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:queryHasMenu]fail to query Has Menu.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 分页查询菜单
     */
    @PostMapping("/queryMenuPage")
    public Object queryMenuPage(Integer pageSize, Integer pageNumber, Menu menu) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:queryMenuPage]query menu success.[menu:"+menu+"]");
            map.put("data",menuService.queryMenuPage((pageNumber - 1) * pageSize, pageSize,menu));
            map.put("total",menuService.countMenu(menu));
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:queryMenuPage]fail to query menu.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 以树形数据的形式查询所有菜单
     */
    @GetMapping("/queryMenuTree")
    public Object queryMenuTree() {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:queryMenuTree]query Menu Tree.");
            map.put("data",menuService.queryMenuTree());
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:queryMenuTree]fail to query Menu Tree.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 查询目录和菜单
     */
    @GetMapping("/propParentMenu")
    public Object propParentMenu() {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            log.info("[MenuController:propParentMenu]query Parent Menu.");
            map.put("catalog",menuService.queryMenuByContents((short)1));//目录
            map.put("menu",menuService.queryMenuByContents((short)2));//菜单
            map.put("success", true);
        } catch (Exception e) {
            log.error("[MenuController:propParentMenu]fail to query Parent Menu.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 添加
     */
    @PostMapping("/insertMenu")
    public Object insertMenu(Menu menu) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:insertMenu]insert user.data:"+menu+"");
            menuService.insertMenu(menu);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:insertMenu]fail to insert Menu.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 删除
     */
    @PostMapping("/deleteMenu")
    public Object deleteMenu(Long[] mid) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:deleteMenu]delete user.");
            menuService.deleteMenu(mid);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:deleteMenu]fail to delete Menu.",e);
            map.put("success", false);
        }
        return map;
    }

    /**
     * 修改
     */
    @PostMapping("/updateMenu")
    public Object updateMenu(Menu menu) {
        Map<String, Object> map = new HashMap<String, Object>();
        try
        {
            log.info("[MenuController:updateMenu]update Menu.data:"+menu);
            menuService.updateMenu(menu);
            map.put("success", true);
        }
        catch (Exception e)
        {
            log.error("[MenuController:updateMenu]fail to update Menu.",e);
            map.put("success", false);
        }
        return map;
    }
}
