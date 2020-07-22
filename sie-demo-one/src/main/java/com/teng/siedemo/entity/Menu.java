package com.teng.siedemo.entity;

import java.util.Objects;

public class Menu {
    private Long id;

    private Short menuContents;

    private Long parentMenu;

    private String menuName;

    private String menuIdentification;

    private String menuUrl;

    private String menuPhoto;

    private Long sortNum;

    private Short menuStatus;

    private String menuRemarks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Short getMenuContents() {
        return menuContents;
    }

    public void setMenuContents(Short menuContents) {
        this.menuContents = menuContents;
    }

    public Long getParentMenu() {
        return parentMenu;
    }

    public void setParentMenu(Long parentMenu) {
        this.parentMenu = parentMenu;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName == null ? null : menuName.trim();
    }

    public String getMenuIdentification() {
        return menuIdentification;
    }

    public void setMenuIdentification(String menuIdentification) {
        this.menuIdentification = menuIdentification == null ? null : menuIdentification.trim();
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl == null ? null : menuUrl.trim();
    }

    public String getMenuPhoto() {
        return menuPhoto;
    }

    public void setMenuPhoto(String menuPhoto) {
        this.menuPhoto = menuPhoto == null ? null : menuPhoto.trim();
    }

    public Long getSortNum() {
        return sortNum;
    }

    public void setSortNum(Long sortNum) {
        this.sortNum = sortNum;
    }

    public Short getMenuStatus() {
        return menuStatus;
    }

    public void setMenuStatus(Short menuStatus) {
        this.menuStatus = menuStatus;
    }

    public String getMenuRemarks() {
        return menuRemarks;
    }

    public void setMenuRemarks(String menuRemarks) {
        this.menuRemarks = menuRemarks == null ? null : menuRemarks.trim();
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", menuContents=" + menuContents +
                ", parentMenu=" + parentMenu +
                ", menuName='" + menuName + '\'' +
                ", menuIdentification='" + menuIdentification + '\'' +
                ", menuUrl='" + menuUrl + '\'' +
                ", menuPhoto='" + menuPhoto + '\'' +
                ", sortNum=" + sortNum +
                ", menuStatus=" + menuStatus +
                ", menuRemarks='" + menuRemarks + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return Objects.equals(id, menu.id) &&
                Objects.equals(menuContents, menu.menuContents) &&
                Objects.equals(parentMenu, menu.parentMenu) &&
                Objects.equals(menuName, menu.menuName) &&
                Objects.equals(menuIdentification, menu.menuIdentification) &&
                Objects.equals(menuUrl, menu.menuUrl) &&
                Objects.equals(menuPhoto, menu.menuPhoto) &&
                Objects.equals(sortNum, menu.sortNum) &&
                Objects.equals(menuStatus, menu.menuStatus) &&
                Objects.equals(menuRemarks, menu.menuRemarks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, menuContents, parentMenu, menuName, menuIdentification, menuUrl, menuPhoto, sortNum, menuStatus, menuRemarks);
    }
}