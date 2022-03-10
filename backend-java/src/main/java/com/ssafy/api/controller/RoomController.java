package com.ssafy.api.controller;

import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.RoomDto;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 방 등록 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "방 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping()
    @ApiOperation(value = "방 등록", notes = "방을 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> roomRegister(
            @RequestBody @ApiParam(value="방 등록 정보", required = true) RoomDto.RoomRegisterPostReq registerInfo){

        Room room = roomService.createRoom(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
