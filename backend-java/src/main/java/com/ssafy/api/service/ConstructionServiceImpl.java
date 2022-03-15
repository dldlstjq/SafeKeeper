package com.ssafy.api.service;


import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.repository.ConstructionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *	회사 등록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("constructionService")
public class ConstructionServiceImpl implements ConstructionService{
    @Autowired
    ConstructionRepository constructionRepository;

    @Override
    public Construction createConstruction(ConstructionDto.ConstructionRegisterPostReq constRegisterInfo) {

        Construction construction = Construction.builder()
                .constructName(constRegisterInfo.getConstructName())
                .build();
        return constructionRepository.save(construction);
    }

    @Override
    public List<ConstructionDto.ConstructionRes> getConstructionList(){

        List<Construction> list = constructionRepository.findAll();

        List<ConstructionDto.ConstructionRes> result = new ArrayList<>();

        for (Construction construction : list) {
            ConstructionDto.ConstructionRes constructionListRes = new ConstructionDto.ConstructionRes();
            constructionListRes.setConstructionId(construction.getConstructionId());
            constructionListRes.setConstructionName(construction.getConstructName());
            result.add(constructionListRes);
        }
        return result;
    }
}
