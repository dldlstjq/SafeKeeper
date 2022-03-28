package com.ssafy.db.repository;


import com.ssafy.db.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    @Query(value = "select * from room_user as ru where ru.user_id=:userId"
              , nativeQuery = true
    )
    List<RoomUser> selectRoomByUser(Long userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "delete from room_user where room_id=:roomId", nativeQuery = true)
    void deleteRoomUserByRoomId(Long roomId);

}
