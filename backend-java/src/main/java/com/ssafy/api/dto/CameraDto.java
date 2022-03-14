package com.ssafy.api.dto;

import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class CameraDto {
    /**
     * 카메라 등록 API ([POST] /api/v1/camera) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("CameraRegisterPostReq")
    public static class CameraRegisterPostReq{
        @ApiModelProperty(name="카메라 장소", required = true)
        String cameraPlace;

        @ApiModelProperty(name="회사", required = true)
        Construction construction;

        @ApiModelProperty(name="방", required = true)
        Room room;
    }

    /**
     * 전체 카메라 정보 조회 API ([GET] /api/v1/camera/getCamera) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("CameraRes")
    public static class CameraRes{
        @ApiModelProperty(name="카메라 아이디", required = true, example="1")
        Long cameraId;

        @ApiModelProperty(name="카메라 장소", required = true, example="옥상")
        String cameraPlace;

        @ApiModelProperty(name="회사", required = true )
        Construction construction;
    }

    /**
     * 회사별 카메라 조회 API 응답 Dto
     */
    @Getter
    @Setter
    @ApiModel("CameraConstReq")
    public static class CameraConstReq{
        @ApiModelProperty(name="회사", required = true )
        Construction construction;
    }

}


