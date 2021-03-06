# 팀원 소개

- 강태훈(팀장) : BE, AI 모델링
- 권영준 : FE - OpenVidu 적용
- 방호진: BE-빌드 및 배포 담당, FE-디자인 적용
- 이인섭: BE, FE OpenVidu 적용
- 홍지원: AI 모델링
- 최형오: AI 모델링



# 기획 아이디어

- 작업 현장 안전 장비 확인

# 배포 페이지

https://j6d101.p.ssafy.io/

# 노션

https://www.notion.so/SSAFY-8e6141ecf8604fcba37f47d710c7c6cc

# 기획 배경

- 작업현장에서 안전장비 미착용으로 인한 사고 방지
- 현장 촬영 영상을 통해 안전장비 미착용자를 식별하고 알림을 주어 장비 착용을 장려하여, 사건 사고를 방지할 수 있음.
- 안전 관리자 수급 부족 현상의 대체재로 떠오름
- 관련 사례 링크
  - 노동부 현장 점검 해본 결과 1만여건 보호구 미착용 사례 적발( https://www.nocutnews.co.kr/news/5669352 • 2021-12-07 12:00)
  - 소규모 건설현장 가보니… 안전모 미착용·추락 방지 안전난간대 없었다.(http://www.joongboo.com • 2022-02-24 13:49)
  - [[현장포커스\] 포천 건설현장 안전모 미착용 다반사 - 전국매일신문 - 전국의 생생한 뉴스를 ‘한눈에’ (jeonmae.co.kr)](http://www.jeonmae.co.kr/news/articleView.html?idxno=857404)
  - 안전 관리자 부족 현상 - http://www.kmecnews.co.kr/news/articleView.html?idxno=23439

# 핵심 기능

- 영상 내 작업자가 안전 장비를 착용하지 않을 시 알람을 통해 경고를 보낸다.
- 안전 관리자는 카메라 영상으로 광범위한 현장을 관리 할 수 있도록 한다.

# 전체 기능

- 안전모 안전화 미 착용시 알람
- 회원가입 / 로그인
- 쓰러진 사람 확인 (추후 추가 기능)
- 화재 현장 확인 (추후 추가 기능)
- 건물 균열 탐지 (추후 추가 기능)
- [시연 시나리오](./exec/시연 시나리오-PDF.pdf)


# 데이터 수집 방안

- AI Hub 내, 공사현장 안전장비 인식 이미지 파일 사용

  - AI Hub 데이터 구성 설명

    - (01) 떨어짐

      01-01. 비계 위에서 안전고리 결착, 떨어짐 01-02. 비계 위에서 안전고리 미결착, 떨어짐 01-03. 우마에서 근로자 떨어짐 01-04. 사다리 위에서 떨어짐 01-05. 갱폼(알폼) 위에서 떨어짐 01-06. 고소작업대에서 떨어짐

    - (02) 부딪힘

      02-01 비계에 안전모 착용, 부딪힘 02-02. 비계에 안전모 미착용, 부딪힘 02-03. 이동중 콘크리트에 부딪힘 02-04 사다리(우마) 작업중 구조물에 부딪힘 02-05. 적재된 자재에 부딪힘 02-06. 지게차에 부딪힘 02-07. 포크레인에 부딪힘 02-08. 고소작업대에 부딪힘

    - (03) 넘어짐

      03-01. 안전모 착용, 자재 및 공구에 걸려 넘어짐 03-02. 안전모 미착용, 자재 및 공구에 걸려 넘어짐 03-03. 안전모 착용, 자재 운반 중 걸려 넘어짐 03-04. 안전모 미착용, 자재 운반 중 걸려 넘어짐 03-05. 선로(배선,배관)에 걸려 넘어짐 03-06. 턱에 걸려 넘어짐 03-07. 계단에서 넘어짐

    - (04) 물체에 맞음

- 추가적으로 개별로 이미지를 찍어, 데이터를 라벨링 예정

  - 안전모, 안전화 구입



# ERD

![ERD_변동사항_없음_](/uploads/fd33d6d5bcaf8a07d7e27b0660726c71/ERD_변동사항_없음_.png)



# 시스템 구성도

![시스템 구성도](image/시스템 구성도.PNG)



# 시퀀스 다이어그램

[시퀀스 다이어그램](./산출물/시퀀스 다이어그램.pdf)



# 빌드 및 배포 과정

[빌드 및 배포 파일](./exec/빌드 및 배포.md)



