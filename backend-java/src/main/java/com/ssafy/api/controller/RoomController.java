package com.ssafy.api.controller;

import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.RoomDto;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("")
    @ApiOperation(value = "회사 정보 조회", notes = "db에 등록된 회사 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<RoomDto.RoomRes>> getAllRoomList() {

        List<RoomDto.RoomRes> list = roomService.getAllRoomList();
        return ResponseEntity.status(200).body(list);
    }

    @PostMapping("/user")
    @ApiOperation(value = "유저가 방에 들어갔을 때 등록", notes = "유저를 방에 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> roomUserRegister(
            @RequestBody @ApiParam(value="유저가 방에 들어갔을 때 정보", required = true) RoomDto.RoomUserRegisterPostRequest registerInfo){

        RoomUser roomUser = roomService.createRoomUser(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/user")
    @ApiOperation(value = "해당 유저의 방 정보 확인", notes = "유저를 방에 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<RoomDto.RoomRes>> geRoomUserList(@RequestParam Long userId){
        List<RoomDto.RoomRes> list = roomService.getRoomListByUser(userId);
        return ResponseEntity.status(200).body(list);
    }
}