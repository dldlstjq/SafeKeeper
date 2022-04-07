package com.ssafy.api.controller;

import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.api.service.ConstructionService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.dto.ConstructionDto.ConstructionRegisterPostReq;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 회사 등록 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "회사 API", tags = {"Construction"})
@RestController
@RequestMapping("/api/v1/construction")
public class ConstructionController {

    @Autowired
    ConstructionService constructionService;

    @PostMapping()
    @ApiOperation(value = "회사 등록", notes = "회사를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ConstructionDto.ConstructionRes>> constructionRegister(
            @RequestBody @ApiParam(value="회사 등록 정보", required = true) ConstructionRegisterPostReq registerInfo){

        Construction construction = constructionService.createConstruction(registerInfo);

        //등록한 회사 정보 반환
        List<ConstructionDto.ConstructionRes> list = constructionService.resConstList(registerInfo.getConstructName());

        return ResponseEntity.status(200).body(list);
    }


    @GetMapping("/getConstruction")
    @ApiOperation(value = "회사 정보 조회", notes = "db에 등록된 회사 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ConstructionDto.ConstructionRes>> getConstructionList() {

        List<ConstructionDto.ConstructionRes> list = constructionService.getConstructionList();
        return ResponseEntity.status(200).body(list);
    }

}
