package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 방 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from room where room_id=:roomId"
    ,nativeQuery = true)
    void deledeRoomByRoomname(Long roomId);
}
