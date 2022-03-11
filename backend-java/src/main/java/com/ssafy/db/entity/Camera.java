package com.ssafy.db.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor // JPA | Entity 는 기본 생성자를 가지고 있어야 함.
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
