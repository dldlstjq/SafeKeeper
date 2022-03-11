package com.ssafy.db.repository;

import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.User;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 카메라 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 *
 * 커스텀 쿼리!!!!!!!
 */
@Repository
public interface CameraRepository extends JpaRepository<Camera, Long> {
//    @Query(value = "select * from camera as c where c.construction_id = 2", nativeQuery = true) //2번으로 검색
    //@Param("num") = find~류 쓸 때의 변수 매핑용인듯하다,,, 없어도 잘 돌아감

    @Query(value = "select * "
            +"from camera as c "
            +"where c.construction_id = :construction", nativeQuery = true)
    List<Camera> selectConstSql(Long construction); //find들어간 함수이름 멈춰,,, | 아니 이 앞에 @Param("num") 뭔데 이거

}

