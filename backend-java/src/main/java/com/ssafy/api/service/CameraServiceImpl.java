package com.ssafy.api.service;

import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.repository.CameraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *	카메라 등록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("cameraService")
public class CameraServiceImpl implements CameraService{

    @Autowired
    CameraRepository cameraRepository;

    @Override
    public Camera createCamera(CameraDto.CameraRegisterPostReq CameraRegisterInfo) {

        Camera camera = Camera.builder()
                .cameraPlace(CameraRegisterInfo.getCameraPlace())
                .construction(CameraRegisterInfo.getConstruction())
                .build();
        return cameraRepository.save(camera);
    }

}
