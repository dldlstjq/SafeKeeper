package com.ssafy.api.controller;

import com.ssafy.api.dto.AccidentDto;
import com.ssafy.api.dto.CameraDto;
import com.ssafy.api.service.AccidentService;
import com.ssafy.api.service.CameraService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Accident;
import com.ssafy.db.entity.Camera;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 사고 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "사고기록 API", tags = {"Accident"})
@RestController
@RequestMapping("/api/v1/accident")
public class AccidentController {
    @Autowired
    AccidentService accidentService;

    @PostMapping
    @ApiOperation(value = "사고 등록", notes = "사고기록을 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> accidentRegister(
            @RequestBody @ApiParam(value="사고 등록 정보", required = true) AccidentDto.AccidentCreateReq registerInfo){
        Accident accident = accidentService.createAccident(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/getAccidentConstList")
    @ApiOperation(value = "회사별 사고 조회", notes = "회사별 사고를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<AccidentDto.AccidentConstRes>> getConstCameraList(
            @RequestBody @ApiParam(value="검색할 회사 정보", required = true) AccidentDto.AccidentConstReq registerInfo) {
        List<AccidentDto.AccidentConstRes> list = accidentService.getAccidentConstList(registerInfo);
        return ResponseEntity.status(200).body(list);
    }
}
