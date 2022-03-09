package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

public class ConstructionDto {

    /**
     * 회사 등록 API ([POST] /api/v1/users/me) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("ConstructionRegisterPostRequest")
    public static class ConstructionRegisterPostReq{
        @ApiModelProperty(name="회사 이름", required = true)
        String constructName;
    }

    /**
     * 회사 정보 조회 API ([GET] /api/v1/construction/getConstruction) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("ConstructionResponse")
    public static class UserRes{

        public static com.ssafy.api.dto.UserDto.UserRes of(User user) {
            com.ssafy.api.dto.UserDto.UserRes res = new com.ssafy.api.dto.UserDto.UserRes();
            res.setUserId(user.getUserId());
            return res;
        }
    }
}
