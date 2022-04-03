/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

import { useRef } from "react";

// video만 가져오도록 true값을 주었습니다.
const CONSTRAINTS = { video: true };

function BillingInformation() {
  // <video />에 걸어줄 useRef Hook을 만들어 줍니다.
  const videoRef = useRef(null);

  // navigator에 내장된 mediaDivices를 통해 연결된 미디어 장치에 접근할 수 있습니다.
  // mediaDivice에 내장된 getUserMedia() 메서드로 MediaStream을 가져올 수 있습니다.
  const startVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1000, height: 600 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
    // if (videoRef && videoRef.current && !videoRef.current.srcObject) {
    //   videoRef.current.srcObject = stream;
    // }
  };

  const closeVideo = async () => {
    const s = videoRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
  };

  return (
    <Card id="delete-account">
      <SuiBox pt={3} px={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          CCTV
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={1} pb={2} px={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <SuiBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            // mb={noGutter ? 0 : 1}
            mt={2}
          >
            <SuiBox width="800px" height="1000px" display="flex" flexDirection="column">
              <video autoPlay ref={videoRef} />
              <button onClick={startVideo}>start</button>
              <button onClick={closeVideo}>stop</button>
            </SuiBox>
          </SuiBox>
          {/* <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          /> */}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default BillingInformation;
