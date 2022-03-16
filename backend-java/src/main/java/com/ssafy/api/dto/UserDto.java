package com.ssafy.api.dto;

import com.ssafy.api.dto.UserDto.UserLoginPostRes;
import com.ssafy.api.dto.UserDto.UserRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


//@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    /**
     * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
     */
    @Getter
    @Setter
    @ApiModel("UserLoginPostRequest")
    public static class UserLoginPostReq {
        @ApiModelProperty(name="유저 ID", example="ssafy_web")
        String id;
        @ApiModelProperty(name="유저 Password", example="your_password")
        String password;
    }

    /**
     * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
     */
    @Getter
    @Setter
    @ApiModel("UserRegisterPostRequest")
    public static class UserRegisterPostReq {
        @NotBlank(message = "아이디를 입력하세요.")
        @ApiModelProperty(name="유저 ID", example="your_id", required = true)
        String id;

        @NotBlank(message = "비밀번호를 입력하세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*\\W)(?=\\S+$).{8,16}",
                message = "비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.")
        @ApiModelProperty(name="유저 Password", example="your_password", required = true)
        String password;

        @NotBlank(message = "이름을 입력하세요.")
        @ApiModelProperty(name="유저 이름", example="your_name", required = true)
        String name;

        @NotBlank(message = "직책을 입력하세요.")
        @ApiModelProperty(name="유저 직책", example="your_role", required = true)
        String role;

        @ApiModelProperty(name="회사 이름", example="your_construction", required = true)
        Construction construction;
    }

    /**
     * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("UserLoginPostResponse")
    public static class UserLoginPostRes extends BaseResponseBody {
        @ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
        String accessToken;

        public static com.ssafy.api.dto.UserDto.UserLoginPostRes of(Integer statusCode, String message, String accessToken) {
            com.ssafy.api.dto.UserDto.UserLoginPostRes res = new com.ssafy.api.dto.UserDto.UserLoginPostRes();
            res.setStatusCode(statusCode);
            res.setMessage(message);
            res.setAccessToken(accessToken);
            return res;
        }
    }


    /**
     * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
     */
    @Getter
    @Setter
    @ApiModel("UserResponse")
    public static class UserRes{
        @ApiModelProperty(name="User ID")
        String userId;

        public static com.ssafy.api.dto.UserDto.UserRes of(User user) {
            com.ssafy.api.dto.UserDto.UserRes res = new com.ssafy.api.dto.UserDto.UserRes();
            res.setUserId(user.getUserId());
            return res;
        }
    }
}
