package com.ssafy.api.dto;


import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class RoomDto {

    /**
     * 방 등록 API ([POST] /api/v1/room) 요청에 대한 응답값 정의.
     */

    @Getter
    @Setter
    @ApiModel("RoomRegisterPostRequest")
    public static class RoomRegisterPostReq{
        @ApiModelProperty(name="방 이름", required = true)
        String roomName;
        @ApiModelProperty(name="방 비밀번호", required = true)
        String roomPassword;
    }

    /**
     * 방 요청 API ([GET] /api/v1/room) 요청에 대한 응답값 정의.
     */

    @Getter
    @Setter
    // 아무 인자가 없는 생성자를 생성
    @NoArgsConstructor
    // 모든 인자를 가진 생성자를 생성
    @AllArgsConstructor
    public static class RoomRes{
        @ApiModelProperty(name="방 번호", required = true)
        Long roomId;
        @ApiModelProperty(name="방 이름", required = true)
        String roomName;
        @ApiModelProperty(name="방 비밀번호", required = true)
        String roomPassword;

        public static RoomDto.RoomRes of(Room room) {
            RoomRes res = new RoomRes();
            res.setRoomId(room.getRoomId());
            res.setRoomName(room.getRoomName());
            // 비밀번호는 나중에 논의
            return res;
        }

    }
}
