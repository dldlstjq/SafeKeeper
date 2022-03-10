package com.ssafy.db.entity;


import lombok.Builder;
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
    @Column(name = "camera_place", nullable = false)
    String cameraPlace;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "construction_id", nullable = false)
    Construction construction;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    Room room;

    @Builder
    public Camera(Long cameraId, String cameraPlace, Construction construction,  Room room){
        this.cameraId = cameraId;
        this.cameraPlace = cameraPlace;
        this.construction = construction;
        this.room = room;
    }
}
