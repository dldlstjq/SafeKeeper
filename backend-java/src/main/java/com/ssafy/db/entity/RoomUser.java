package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RoomUser extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Builder
    public RoomUser(Room room, User user){
        this.room = room;
        this.user = user;
    }
}
