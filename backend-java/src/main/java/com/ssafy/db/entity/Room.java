package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Room{
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long roomId;

    //방 이름
    @Column(name = "room_name", nullable = false)
    String roomName;

    // 방 Password
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "room_password", nullable = false)
    String roomPassword;


    @Builder
    public Room(Long roomId, String roomName, String roomPassword){
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomPassword = roomPassword;
    }
}
