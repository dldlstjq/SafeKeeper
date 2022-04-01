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
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {/* 상단부 */}
          <Grid item xs={12} xl={4}>
            <TableContainer component={Paper}>
              {/* 달력 */}
              <Grid item xs={12}>
                <SuiBox pt={1} px={1} mb={1}>
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
                </SuiBox>
              </Grid>

              {/* 다이얼로그 테스트 */}
              {/* <SuiBox pt={2} px={2} mb={1}>
                <SuiBox mb={0.5}>
                  <SuiTypography variant="h6" fontWeight="medium">
                    Alerts test
                  </SuiTypography>
                </SuiBox>
                <SuiBox mb={1}>
                  <SuiTypography variant="button" fontWeight="regular" color="text">
                    show alerts
                  </SuiTypography>
                </SuiBox>
                <SuiButton
                  component="a"
                  // href={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  size="small"
                  color="info"
                  onClick={handleClickOpen}
                >
                  test
                </SuiButton>
              </SuiBox>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"@알림창 테스트@"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    대충 내용 어쩌구 저쩌구
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog> */}
            </TableContainer>
          </Grid>

          {/* 컴포넌트 테스트  */}
          <Grid item xs={12} xl={8}>
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

      {/* 하단부 */}
      <SuiBox mb={3}>
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
              {/* 사고 컴포넌트..? 데이터 받아올게 있으면 3개씩 출력하면 될지도 */}
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                />
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
