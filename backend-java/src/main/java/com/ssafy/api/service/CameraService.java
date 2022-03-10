package com.ssafy.api.service;


import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Camera;

/**
 *	카메라 등록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface CameraService {
    Camera createCamera(CameraDto.CameraRegisterPostReq CameraRegisterInfo);

}
