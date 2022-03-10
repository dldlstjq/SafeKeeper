package com.ssafy.api.service;

import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.RoomDto;
import com.ssafy.api.dto.RoomDto.RoomRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.entity.Room;

import java.util.ArrayList;
import java.util.List;

/**
 *	방 등록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("roomService")
public class RoomServiceImpl implements RoomService{
    @Autowired
    RoomRepository roomRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Room createRoom(RoomDto.RoomRegisterPostReq roomRegisterInfo){
        Room room = Room.builder()
                .roomName(roomRegisterInfo.getRoomName())
                // 패스워드 암호화
                .roomPassword(passwordEncoder.encode(roomRegisterInfo.getRoomPassword()))
                .build();
        return roomRepository.save(room);
    }

    @Override
    public List<RoomDto.RoomRes> getAllRoomList(){
        List<Room> list = roomRepository.findAll();

        List<RoomDto.RoomRes> result = new ArrayList<>();

        for(Room room : list){
            RoomDto.RoomRes roomListRes = new RoomDto.RoomRes();
            roomListRes.setRoomId(room.getRoomId());
            roomListRes.setRoomName(room.getRoomName());
            result.add(roomListRes);
        }
        return result;
    }
}
