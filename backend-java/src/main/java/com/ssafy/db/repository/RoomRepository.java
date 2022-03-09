package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.db.entity.Room;
import org.springframework.stereotype.Repository;

/**
 * 방 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
}
