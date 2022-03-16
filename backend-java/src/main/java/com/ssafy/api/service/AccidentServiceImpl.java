package com.ssafy.api.service;

import com.ssafy.api.dto.AccidentDto;
import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Accident;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.repository.AccidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *	사고 기록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("accidentService")
public class AccidentServiceImpl implements AccidentService{

    @Autowired
    AccidentRepository accidentRepository;

    //Todo 사고 기록 생성
    @Override
    public Accident createAccident(AccidentDto.AccidentCreateReq accidentAllReq) {
        Accident accident = Accident.builder()
                .accidentDate(accidentAllReq.getAccidentDate())
                .accidentDescription(accidentAllReq.getAccidentDesc())
                .accidentPicture(accidentAllReq.getAccidentPicture())
                .accidentType(accidentAllReq.getAccidentType())
                .camera(accidentAllReq.getCamera())
                .build();
        return accidentRepository.save(accident);
    }

    //Todo 회사별 사고 기록 조회
    @Override
    public List<AccidentDto.AccidentConstRes> getAccidentConstList(AccidentDto.AccidentConstReq registerInfo) {
        //Todo 회사정보 전체 -> id만 가져오기
        Long num  = registerInfo.getConstruction().getConstructionId();
        System.out.println("검색할 번호 : "+ num); // 회사 가져오는거 확인

        //Todo sql문으로 넘기기
        List<Accident> list = accidentRepository.selectAccConstSql(registerInfo.getConstruction().getConstructionId());

        //결과 확인,,,이 안되네
//        for (Accident accident : list) { System.out.println(accident.toString()); }

        //Todo 검색해온 값 출력포멧으로 고치기
        List<AccidentDto.AccidentConstRes> result = new ArrayList<>();
        for (Accident accident : list) {
            AccidentDto.AccidentConstRes accidentConstRes = new AccidentDto.AccidentConstRes();
            System.out.println(accidentConstRes.getAccidentId()); //어라
            accidentConstRes.setAccidentId(accidentConstRes.getAccidentId());
            accidentConstRes.setAccidentDate(accident.getAccidentDate());
            accidentConstRes.setAccidentDesc(accident.getAccidentDescription());
            accidentConstRes.setAccidentPicture(accident.getAccidentPicture());
            accidentConstRes.setAccidentType(accident.getAccidentType());
            accidentConstRes.setCamera(accident.getCamera());
            result.add(accidentConstRes);
//
        }
        return result;
    }



}
