package com.ssafy.api.service;


import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.repository.ConstructionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *	회사 등록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("constructionService")
public class ConstructionServiceImpl implements ConstructionService{
    @Autowired
    ConstructionRepository constructionRepository;

    @Override
    public Construction createConstruction(ConstructionDto.ConstructionRegisterPostReq constRegisterInfo) {
        Construction construction = new Construction();
        construction.setConstructName(constRegisterInfo.getConstructName());
        return constructionRepository.save(construction);
    }
}
