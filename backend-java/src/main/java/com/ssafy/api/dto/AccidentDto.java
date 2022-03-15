package com.ssafy.api.dto;

import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.security.Timestamp;
import java.util.Date;

public class AccidentDto {

    /**
     * 사고 기록 API ([POST] /api/v1/accident)요청 Dto
     * input : 사고기록
     */
    @Getter
    @Setter
    @ApiModel("AccidentAllReq")
    public static class AccidentCreateReq{
        @ApiModelProperty(name="사고 날짜", required = true)
        Date accidentDate; //자동생성..? 이거 없으면 안돌아감

        @ApiModelProperty(name="상세설명", required = true)
        String accidentDesc;

        @ApiModelProperty(name="사고 사진", required = true)
        String accidentPicture;

        @ApiModelProperty(name="종류", required = true)
        String accidentType;

        @ApiModelProperty(name="카메라", required = true)
        Camera camera;
    }

    /**
     * 회사별 통계 API ([POST] /api/v1/accident)요청 Dto
     * input : 회사정보
     */
    @Getter
    @Setter
    @ApiModel("AccidentConstReq")
    public static class AccidentConstReq{
        @ApiModelProperty(name="회사", required = true )
        Construction construction;
    }

    ////////////////////////////////////////////////////////////
    /**
     * 회사별 통계 API ([POST] /api/v1/accident)응답Dto
     * output : 사고기록
     */
    @Getter
    @Setter
    @ApiModel("AccidentConstRes")
    public static class AccidentConstRes{
        @ApiModelProperty(name="사고 id", required = true)
        Long accidentId;

        @ApiModelProperty(name="사고 날짜", required = true)
        Date accidentDate;

        @ApiModelProperty(name="상세설명", required = true)
        String accidentDesc;

        @ApiModelProperty(name="사고 사진", required = true)
        String accidentPicture;

        @ApiModelProperty(name="종류", required = true)
        String accidentType;

        @ApiModelProperty(name="카메라", required = true)
        Camera camera;
    }
}
