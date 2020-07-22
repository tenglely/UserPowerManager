package com.teng.siedemo.dao;

import com.teng.siedemo.entity.Menu;

import java.sql.Timestamp;
import java.util.List;

import com.teng.siedemo.entity.vo.MenuTree;
import org.apache.ibatis.annotations.Param;

public interface MenuMapper {

    int deleteByPrimaryKey(Long id);

    int insertSelective(Menu record);

    int updateByPrimaryKeySelective(Menu record);

    /**
     *分页查询菜单
     * @param start
     * @param pageSize
     * @param menu
     * @return
     */
    List<Menu> queryMenuPage(@Param("start") Integer start,
                             @Param("pageSize") Integer pageSize,
                             @Param("menu") Menu menu);

    /**
     * 查询菜单数目
     * @param menu
     * @return
     */
    Integer countMenu(@Param("menu") Menu menu);

    /**
     * 查询目录数据
     * @param contents
     * @return
     */
    List<MenuTree> queryMenuTreeByContents(@Param("contents") short contents);

    /**
     * 根据上级菜单，菜单类型查询
     * @param parentMenu
     * @param contents
     * @return
     */
    List<MenuTree> queryMenuTreeByParentAndContents(@Param("parentMenu") Long parentMenu,
                                                    @Param("contents") short contents);

    /**
     * 查询角色菜单列表
     * @param roleId
     * @param nowtime
     * @return
     */
    List<Menu> queryHasMenu(@Param("roleId") Long roleId, @Param("nowtime") Timestamp nowtime);

    /**
     * 根据菜单类型查询
     * @param menuContents
     * @return
     */
    List<Menu> queryMenuByContents(@Param("menuContents") Short menuContents);
}