package com.ssafy.api.controller;

import com.ssafy.api.dto.CameraDto;
import com.ssafy.api.service.CameraService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Camera;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Camera 등록 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "카메라 API", tags = {"Camera"})
@RestController
@RequestMapping("/api/v1/camera")
public class CameraController {
    @Autowired
    CameraService cameraService;
    @PostMapping
    @ApiOperation(value = "카메라 등록", notes = "카메라를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> cameraRegister(
            @RequestBody @ApiParam(value="Camera 등록 정보", required = true) CameraDto.CameraRegisterPostReq registerInfo){

        Camera camera = cameraService.createCamera(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


}
