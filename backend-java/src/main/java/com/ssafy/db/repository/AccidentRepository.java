package com.ssafy.db.repository;

import com.ssafy.db.entity.Accident;
import com.ssafy.db.entity.Camera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 사고 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 *
 */
@Repository
public interface AccidentRepository extends JpaRepository<Accident, Long>{

    @Query(value = "select * "
            +"from accident a  "
            +"join camera c  "
            +"on a.camera_id = c.camera_id "
            +"join construction con "
            +"on c.construction_id = con.construction_id "
            +"where con.construction_id=:construction_id", nativeQuery = true)
    List<Accident> selectAccConstSql(Long construction_id);

}


