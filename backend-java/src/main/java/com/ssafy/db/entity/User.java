package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class User extends BaseEntity{
    // 부서
    @Column(name = "user_role", nullable = false)
    String userRole;
    // 유저 이름
    @Column(name = "user_name", nullable = false)
    String userName;
    // 유저 ID
    @Column(name = "user_id", nullable = false)
    String userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "construction_id", nullable = false)
    Construction construction;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    List<Room> room;

    // 유저 Password
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "user_password", nullable = false)
    String userPassword;
}
