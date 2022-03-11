package com.ssafy.api.service;


import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Camera;

import java.util.List;

/**
 *	카메라 등록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface CameraService {
    Camera createCamera(CameraDto.CameraRegisterPostReq CameraRegisterInfo);
    List<CameraDto.CameraRes> getAllCameraList(); //전체 카메라 리스트 반환
    List<CameraDto.CameraRes> getConstCameraList(CameraDto.ConstCameraReq registerInfo); //회사별 카메라 리스트 반환
    //방별 카메라 반환
    //카메라 update
    //카메라 delete

}
