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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
// import data from "./data.json";
import { ResponsiveLine } from "@nivo/line";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "index";
import { Button } from "@mui/material";
let data = [
  {
    name: "09",
    count: 0,
    amt: 2000,
  },
  {
    name: "10",
    count: 0,
    amt: 2000,
  },
  {
    name: "11",
    count: 0,
    amt: 2000,
  },
  {
    name: "12",
    count: 0,
    amt: 2000,
  },
  {
    name: "13",
    count: 0,
    amt: 2000,
  },
  {
    name: "14",
    count: 0,
    amt: 2000,
  },
  {
    name: "15",
    count: 0,
    amt: 2000,
  },
  {
    name: "16",
    count: 0,
    amt: 2000,
  },
  {
    name: "17",
    count: 0,
    amt: 2000,
  },
];

function Tables() {
  const { size } = typography;
  const [accident, setAccident] = useState([]);
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .post(BASE_URL + "/api/v1/accident/getAccidentConstList", {
        construction: {
          constructName: "samsung",
          constructionId: 1,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setAccident(res.data);
        // for (let i = 0; i < data.length; ++i) {
        //   for (let j = 0; j < accident.length; ++j) {
        //     const hour = accident[j].accidentDate.substr(11, 2);
        //     if (data[i].name === hour) {
        //       data[i].count++;
        //     }
        //     console.log(accident[j].accidentDate);
        //   }
        // }
        // console.log(data);
        // setDatas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function showChart() {
    setShow(true);
    for (let i = 0; i < data.length; ++i) {
      for (let j = 0; j < accident.length; ++j) {
        const hour = accident[j].accidentDate.substr(11, 2);

        if (Number(data[i].name) === Number(hour) + 9) {
          data[i].count++;
        }
        // console.log(accident[j].accidentDate);
      }
    }
    // console.log(data);
    setDatas(data);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <h1>통계</h1>
              <Button onClick={showChart}>보기</Button>
              {show && (
                <LineChart
                  width={1000}
                  height={500}
                  data={datas}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              )}

              {/* <GradientLineChart
                title="통계 그래프"
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
              /> */}
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
