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
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profileZsListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

//
import * as React from "react";
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import Table from "examples/Tables/Table";
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SuiButton from "components/SuiButton";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

// Billing page components
import Bill from "layouts/billing/components/Bill";

// Data
import projectsTableData from "layouts/profile/data/projectsTableData";
import axios from "axios";
import { BASE_URL } from "index";
import { useEffect, useState } from "react";

// Soft UI Dashboard React routes
import routes from "routes";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";


const rows = [
  {
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
];

function Overview() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [construction, setConst] = useState([]);
  const [constructionName, setConstName] = useState("");
  const [constructionId, setConstId] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    accidentConstList();
  }, []);

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

  function accidentConstList() {
   

    if ( user!=null ) {
      console.log(user.construction.constructName);
      console.log(user.construction.constructionId);
      axios
      .post(BASE_URL + "/api/v1/accident/getAccidentConstList", 
      { construction:{constructName: user.construction.constructName, constructionId:user.construction.constructionId}})
      .then((res) => {
        console.log(res);
        
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
        user!=null
        ? 
        <div>
            <Header />
              <TableInfo></TableInfo>
              <TableAcc></TableAcc>
            <Footer />
        </div>

        : 
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
        </Routes>
      }
    </div>
      
    </DashboardLayout>
  );
}

function TableInfo(){
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
                    <SuiTypography variant="h6" fontWeight="medium">
                      넣을 내용이 없음,,
                    </SuiTypography>
                  </SuiBox>
                  <SuiBox pt={1} pb={2} px={2}>
                    <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <Bill
                        name="oliver liam"
                        company="viking burrito"
                        email="oliver@burrito.com"
                        vat="FRB1235476"
                      />
                    </SuiBox>
                  </SuiBox>
                </Card>
              </Grid>
    
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
    )
}
function TableAcc(){
  const { columns: prCols, rows: prRows } = projectsTableData;
  return(
    <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SuiTypography variant="h6">Projects table</SuiTypography>
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
        </SuiBox>
      </Card>
  )
}

export default Overview;
