package com.ssafy.api.service;


import com.ssafy.api.dto.CameraDto;
import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.Construction;

import java.util.List;

/**
 *	카메라 등록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface CameraService {
    Camera createCamera(CameraDto.CameraRegisterPostReq CameraRegisterInfo);
    List<CameraDto.CameraRes> getAllCameraList(); //전체 카메라 리스트 반환
//    List<CameraDto.CameraRes> getConstCameraList(); //회사별 카메라 리스트 반환

}
