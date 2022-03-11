package com.ssafy.api.service;

import com.ssafy.api.dto.CameraDto;
import com.ssafy.db.entity.Camera;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CameraRepository;
import com.ssafy.db.repository.ConstructionRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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
    CameraRepository cameraRepositorySupport;


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
        List<Camera> list = cameraRepository.findAll(); //sql문 안쓰고 자동으로 해버리기 => Reporitory 갈 필요 없음

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

    @Override
    public List<CameraDto.CameraRes> getConstCameraList(CameraDto.ConstCameraReq registerInfo) {
        //Todo 회사정보로 카메라 조회하기
        // 회사정보 전체 -> id만 가져오기
        Long num  = registerInfo.getConstruction().getConstructionId();
//        System.out.println("검색할 번호 : "+ num); // 회사 가져오는거 확인 완

        //Todo sql문으로 넘기기
//        cameraRepositorySupport.selectConstSql(num); //성공!
        List<Camera> list = cameraRepositorySupport.selectConstSql(num);

        //Todo 검색해온 값 출력포멧으로 고치기
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
}
