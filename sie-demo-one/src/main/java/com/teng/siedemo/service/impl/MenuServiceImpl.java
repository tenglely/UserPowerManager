package com.teng.siedemo.service.impl;

import com.teng.siedemo.dao.MenuMapper;
import com.teng.siedemo.dao.UserRoleMapper;
import com.teng.siedemo.entity.Menu;
import com.teng.siedemo.entity.Role;
import com.teng.siedemo.entity.UserRole;
import com.teng.siedemo.entity.vo.MenuTree;
import com.teng.siedemo.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MenuServiceImpl implements MenuService {
    @Resource
    private MenuMapper menuMapper;
    @Resource
    private UserRoleMapper userRoleMapper;

    @Override
    public List<Menu> queryMenuByContents(Short menuContents) {
        return menuMapper.queryMenuByContents(menuContents);
    }

    @Override
    public int updateMenu(Menu menu) {
        return menuMapper.updateByPrimaryKeySelective(menu);
    }

    @Override
    @Transactional
    public void deleteMenu(Long[] mid) {
        for(Long id : mid)
        {
            menuMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    @Transactional
    public int insertMenu(Menu menu) {
        return menuMapper.insertSelective(menu);
    }

    @Override
    public List<Menu> queryHasMenu(String username) {
        //查找用户角色
        List<UserRole> userRoleList = userRoleMapper.queryByUsername(username);
        //查询所有角色权限并去除重复权限
        Set<Menu> set = new HashSet<>();
        for(UserRole userRole : userRoleList)
        {
            Timestamp nowtime = new Timestamp(System.currentTimeMillis());
            set.addAll(menuMapper.queryHasMenu(userRole.getRoleId(),nowtime));
        }
        List<Menu> list = new ArrayList<>(set);
        return list;
    }

    @Override
    public List<MenuTree> queryMenuTree() {
        //查询目录数据
        List<MenuTree> list = menuMapper.queryMenuTreeByContents((short)1);
        List<MenuTree> data = new ArrayList<>();
        for(MenuTree menuTree:list)
        {
            //查询菜单数据
            List<MenuTree> menulist = menuMapper.queryMenuTreeByParentAndContents(menuTree.getId(),(short)2);
            List<MenuTree> data1 = new ArrayList<>();
            for(MenuTree menuTree1:menulist)
            {
                //查询菜单功能数据
                List<MenuTree> mlist = menuMapper.queryMenuTreeByParentAndContents(menuTree1.getId(),(short)3);
                menuTree1.setChildren(mlist);
                data1.add(menuTree1);
            }
            menuTree.setChildren(data1);
            data.add(menuTree);
        }
        return data;
    }

    @Override
    public List<Menu> queryMenuPage(Integer start, Integer pageSize, Menu menu) {
        return menuMapper.queryMenuPage(start,pageSize,menu);
    }

    @Override
    public Integer countMenu(Menu menu) {
        return menuMapper.countMenu(menu);
    }
}
