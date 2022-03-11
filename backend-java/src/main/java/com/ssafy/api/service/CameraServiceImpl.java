package com.ssafy.api.service;

import com.ssafy.api.dto.CameraDto;
import com.ssafy.api.dto.ConstructionDto;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.Construction;
import com.ssafy.db.repository.CameraRepository;
import com.ssafy.db.repository.ConstructionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *	카메라 등록 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 *
 */
@Service("cameraService")
public class CameraServiceImpl implements CameraService{

    @Autowired
    CameraRepository cameraRepository;

    @Autowired
    ConstructionRepository constructionRepository;

    //Todo 카메라 생성
    @Override
    public Camera createCamera(CameraDto.CameraRegisterPostReq CameraRegisterInfo) {
        Camera camera = Camera.builder()
                .cameraPlace(CameraRegisterInfo.getCameraPlace())
                .construction(CameraRegisterInfo.getConstruction())
                .build();
        return cameraRepository.save(camera);
    }

    @Override
    public List<CameraDto.CameraRes> getAllCameraList() {
        List<Camera> list = cameraRepository.findAll();

        List<CameraDto.CameraRes> result = new ArrayList<>();

        for (Camera camera : list) {
            CameraDto.CameraRes cameraRes = new CameraDto.CameraRes();
            cameraRes.setCameraId(camera.getCameraId());
            cameraRes.setCameraPlace(camera.getCameraPlace());
            cameraRes.setConstruction(camera.getConstruction());
            result.add(cameraRes);
        }
        return result;
    }

//    @Override
//    public List<CameraDto.CameraRes> getConstCameraList() {
//        //Todo 회사정보로 카메라 조회하기
//        List<Camera> list = cameraRepository.findAll();
//
//        List<CameraDto.CameraRes> result = new ArrayList<>();
//
//        for (Camera camera : list) {
//            CameraDto.CameraRes cameraRes = new CameraDto.CameraRes();
//            cameraRes.setCameraId(camera.getCameraId());
//            cameraRes.setCameraPlace(camera.getCameraPlace());
//            cameraRes.setConstruction(camera.getConstruction());
//            result.add(cameraRes);
//        }
//        return result;
//    }


}
