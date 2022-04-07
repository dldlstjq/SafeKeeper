package com.ssafy.db.repository;

import com.ssafy.db.entity.Accident;
import com.ssafy.db.entity.Construction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 회사 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ConstructionRepository extends JpaRepository<Construction, Long> {

    @Query(value = "select * from construction where construction_name=:construction_name", nativeQuery = true)
    List<Construction> resConstInfo(String construction_name);
}
