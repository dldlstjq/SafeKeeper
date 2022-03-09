package com.ssafy.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
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
}
