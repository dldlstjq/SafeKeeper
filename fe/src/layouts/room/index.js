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
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import samsung from "assets/images/samsung.jpg";
import naver from "assets/images/naver.png";
import doosan from "assets/images/doosan.jpg";
import hyundai from "assets/images/hyundai.jpg";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
// import typography from "assets/theme/base/typography";

// Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/room/components/Projects";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "index";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Room() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user === undefined) {
      axios
        .post(BASE_URL + "/api/v1/camera/getConstCameraList", {
          construction: {
            constructName: user.construction.constructName,
            constructionId: user.construction.constructionId,
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("camera", JSON.stringify(res.data[0]));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Samsung" }}
              count="$53,000"
              image={{ src: samsung, name: "samsung" }}
              // percentage={{ color: "success", text: "+55%" }}
              // icon={{ color: "info", component: "paid" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Naver" }}
              count="2,300"
              image={{ src: naver, name: "naver" }}
              // percentage={{ color: "success", text: "+3%" }}
              // icon={{ color: "info", component: "public" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Hyundai" }}
              count="+3,462"
              image={{ src: hyundai, name: "hyundai" }}
              // percentage={{ color: "error", text: "-2%" }}
              // icon={{ color: "info", component: "emoji_events" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Doosan" }}
              count="$103,430"
              image={{ src: doosan, name: "doosan" }}
              // percentage={{ color: "success", text: "+5%" }}
              // icon={{
              //   color: "info",
              //   component: "shopping_cart",
              // }}
            />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox py={3}>
        {/* <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SuiBox> */}
        {/* <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="?????? ?????????1111"
                description={
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SuiTypography>
                    </SuiTypography>
                  </SuiBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SuiBox> */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Projects />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
        </Grid>
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Room;
