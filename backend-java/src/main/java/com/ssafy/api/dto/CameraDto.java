package com.ssafy.api.dto;

import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

public class CameraDto {

    /**
     * 카메라 등록 API ([POST] /api/v1/users/me) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("CameraRegisterPostRequest")
    public static class CameraRegisterPostReq{


        @ApiModelProperty(name="카메라 장소", required = true)
        String cameraPlace;

        @ApiModelProperty(name="회사", required = true)
        Construction construction;

        @ApiModelProperty(name="방", required = true)
        Room room;

    }


}
