package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.api.dto.RoomDto.RoomRegisterPostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;

import java.util.List;

/**
 *	방 등록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface RoomService {
    Room createRoom(RoomRegisterPostReq roomRegisterPostReq);
    RoomUser createRoomUser(RoomDto.RoomUserRegisterPostRequest roomUserRegisterPostRequest);
    List<RoomDto.RoomRes> getAllRoomList();
    List<RoomDto.RoomRes> getRoomListByUser(Long userId);
}
