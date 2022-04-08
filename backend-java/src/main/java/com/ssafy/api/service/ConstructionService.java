package com.ssafy.api.service;

import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.ConstructionDto.ConstructionRegisterPostReq;
import com.ssafy.db.entity.Construction;

import java.util.List;

/**
 *	회사 등록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ConstructionService {
    Construction createConstruction(ConstructionRegisterPostReq constRegisterInfo);
    List<ConstructionDto.ConstructionRes> resConstList(String constRegisterInfo);
    List<ConstructionDto.ConstructionRes> getConstructionList();
}
