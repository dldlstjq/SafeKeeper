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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Overview page components
import Header from "layouts/profile/components/Header";
import Bill from "layouts/billing/components/Bill";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";

//
import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

// Data
import axios from "axios";
import { BASE_URL } from "index";
import { useEffect, useState } from "react";

// Soft UI Dashboard React routes
import routes from "routes";
import { Routes, Route, Navigate } from "react-router-dom";

function Overview() {
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  let [enters, setEnters] = useState({
    columns: [
      { name: "회사", align: "center" },
      { name: "현장사진", align: "left" },
      { name: "타입", align: "left" },
      { name: "날짜", align: "center" },
      { name: "상세설명", align: "center" },
    ],
    rows: [],
  });

  useEffect(() => {
    accidentConstList();
  }, []);

  function accidentConstList() {
    if (user != null) {
      // console.log(user.construction.constructName);
      axios
        .post(BASE_URL + "/api/v1/accident/getAccidentConstList", {
          construction: {
            constructName: "samsung",
            constructionId: 1,
          },
        })
        .then((res) => {
          console.log(res.data);

          for (const i of res.data) {
            if (i != null) {
              // console.log(i);

              setEnters((prevEnters) => ({
                columns: [...prevEnters.columns],
                rows: [
                  ...prevEnters.rows,
                  {
                    회사: (
                      <SuiTypography variant="button" color="text" fontWeight="medium">
                        {i.camera.construction.constructName}
                      </SuiTypography>
                    ),
                    현장사진: i.accidentPicture,
                    타입: (
                      <SuiTypography variant="button" color="text" fontWeight="medium">
                        {i.accidentType}
                      </SuiTypography>
                    ),
                    날짜: (
                      <SuiTypography variant="button" color="text" fontWeight="medium">
                        {i.accidentDate}
                      </SuiTypography>
                    ),
                    상세설명: (
                      <SuiTypography variant="button" color="text" fontWeight="medium">
                        {i.accidentDesc}
                      </SuiTypography>
                    ),
                  },
                ],
              }));
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      return null;
    }
  }

  return (
    <DashboardLayout>
      <div>
        {
          // 저장된 유저정보가 없으면 로그인 페이지로 이동
          user != null ? (
            <div>
              <Header />
              <TableInfo></TableInfo>
              <TableAcc></TableAcc>
              <Footer />
            </div>
          ) : (
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
            </Routes>
          )
        }
      </div>
    </DashboardLayout>
  );

  function TableInfo() {
    const [value, setValue] = React.useState(new Date());
    return (
      <SuiBox mb={3} pt={2}>
        <Card>
          <SuiBox pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Projects
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={4} md={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={8} xl={8}>
                <Card id="delete-account">
                  <SuiBox pt={3} px={2}>
                    {/* <SuiTypography variant="h6" fontWeight="medium">
                        넣을 내용이 없음,,
                      </SuiTypography> */}
                  </SuiBox>
                  <SuiBox pt={1} pb={2} px={2}>
                    <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <Bill
                        name={user.userName}
                        company={user.construction.constructName}
                        email={user.userId}
                        vat={user.userRole}
                      />
                    </SuiBox>
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
    );
  }

  function TableAcc() {
    const { columns: accCols, rows: accRows } = enters;

    return (
      <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SuiTypography variant="h6">현장 사고 기록</SuiTypography>
        </SuiBox>
        <SuiBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          {/* <Table columns={prCols} rows={prRows} /> */}
          <Table columns={accCols} rows={accRows} />
        </SuiBox>
      </Card>
    );
  }
}
export default Overview;
