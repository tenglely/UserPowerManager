package com.teng.siedemo.entity;

import java.sql.Timestamp;

public class Role {
    private Long id;

    private String roleCode;

    private String roleName;

    private Timestamp startTime;

    private Timestamp overTime;

    private Short roleStatus;

    private String roleRemarks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode == null ? null : roleCode.trim();
    }

    public String getRoleName() {
        return roleName;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getOverTime() {
        return overTime;
    }

    public void setOverTime(Timestamp overTime) {
        this.overTime = overTime;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }


    public Short getRoleStatus() {
        return roleStatus;
    }

    public void setRoleStatus(Short roleStatus) {
        this.roleStatus = roleStatus;
    }

    public String getRoleRemarks() {
        return roleRemarks;
    }

    public void setRoleRemarks(String roleRemarks) {
        this.roleRemarks = roleRemarks == null ? null : roleRemarks.trim();
    }
}