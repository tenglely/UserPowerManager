package com.teng.siedemo.service;

import com.teng.siedemo.entity.Menu;
import com.teng.siedemo.entity.vo.MenuTree;

import java.util.List;

public interface MenuService {
    /**
     * 分页查询菜单
     * @param start
     * @param pageSize
     * @param menu
     * @return
     */
    List<Menu> queryMenuPage(Integer start, Integer pageSize, Menu menu);

    /**
     * 查询菜单数目
     * @param menu
     * @return
     */
    Integer countMenu(Menu menu);

    /**
     * 以树形数据的形式查询所有菜单
     * @return
     */
    List<MenuTree> queryMenuTree();

    /**
     * 查询角色菜单列表
     * @param username
     * @return
     */
    List<Menu> queryHasMenu(String username);

    /**
     * 添加
     * @param menu
     * @return
     */
    int insertMenu(Menu menu);

    /**
     * 删除
     * @param mid
     */
    void deleteMenu(Long[] mid);

    /**
     * 修改
     * @param menu
     * @return
     */
    int updateMenu(Menu menu);

    /**
     * 根据菜单类型查询
     * @param menuContents
     * @return
     */
    List<Menu> queryMenuByContents(Short menuContents);
}
