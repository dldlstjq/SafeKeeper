package com.ssafy.api.service;

import com.ssafy.api.dto.AccidentDto;
import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Accident;

import java.util.List;

/**
 *	사고기록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface AccidentService {
    Accident createAccident(AccidentDto.AccidentCreateReq accidentAllReq); //사고 등록
    List<AccidentDto.AccidentConstRes> getAccidentConstList(AccidentDto.AccidentConstReq registerInfo); //회사별 사고 검색
}
