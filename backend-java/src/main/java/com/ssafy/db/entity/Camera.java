package com.ssafy.db.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Camera{
    @Id
    @Column(name = "camera_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long cameraId;
    // 배치 장소
    @Column(name = "camera_place")
    String cameraPlace;
}
