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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/crane.jpg";

import axios from "axios";
import { BASE_URL } from "index";
import { Update } from "@mui/icons-material";

function SignUp() {
  const [company, setCompany] = useState();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    id: ["", false],
    name: ["", false],
    role: ["", false],
    company: ["", false],
    pw: ["", false],
    pw2: ["", false],
  });
  const [companies, setCompanies] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = new useNavigate();

  const { pw, pw2 } = inputs;

  useEffect(() => {
    if (pw[0] !== pw2[0]) {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], false] });
    } else {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], true] });
    }
  }, [pw]);

  useEffect(() => {
    update();
  }, []);

  function update() {
    axios
      .get(BASE_URL + "/api/v1/construction/getConstruction")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));
  }

  function allClear() {
    for (const key in inputs) {
      if (!inputs[key][1]) return false;
    }
    return true;
  }
  function submit(e) {
    e.preventDefault();
    if (!allClear()) {
      alert("?????? ??????????????????\n??????????????? 8-16??? ??????,??????,??????????????? ?????????????????????");
      return;
    }
    const data = {
      construction: inputs.company[0],
      id: inputs.id[0],
      name: inputs.name[0],
      password: inputs.pw[0],
      role: inputs.role[0],
    };
    axios
      .post(BASE_URL + "/api/v1/users", data)
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  }
  function validate(name, val) {
    switch (name) {
      case "id":
        return Boolean(val) && val.length <= 10;
      case "pw":
        return (
          val.length >= 8 && val.length <= 16 && /\d/.test(val) && /\w/.test(val) && /\W/.test(val)
        );
      case "pw2":
        return val === inputs.pw[0];
      case "name":
        return Boolean(val) && val.length <= 10 && !/[^A-Za-z???-??????-??????-???]/.test(val);
      case "role":
        return Boolean(val) && val.length <= 45;
      default:
        console.log("error in validation");
        return;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: [value, validate(name, value)],
    });
  }

  function add() {
    axios
      .post(BASE_URL + "/api/v1/construction", { constructName: company })
      .then((res) => {
        /*
        (openVidu??? ???????????? ???????????? DB??? ????????? ????????? ?????? ?????????) 
        sol1) 
        1. ?????? ???????????????? ???????????? ??????????????? ????????? o
        2. ?????? ????????? ????????? ????????? ???????????? ????????? 
        3. ?????? ????????? 1?????? ????????????
              
        sol2)
        1. ?????? ????????? ????????????
        2. ?????? ????????? 1?????? ????????????
        */
        
        for (const i of res.data) {
          console.log(i)
          if (i != null) {
            axios
            .post(BASE_URL + "/api/v1/camera/", {
              cameraPlace: "1???",
              construction: {
                constructName: i.constructionName,
                constructionId: i.constructionId
              },
              room: {
                roomId: 0,
                roomName: "string"
              }
            })
            .then((res2) => {
              console.log(res2.data)           
            })
            .catch((err2) => console.log(err2));
          }
        }     
      })
      .catch((err) => console.log(err));
  }

  return (
    <BasicLayout
      title="???????????????!"
      description="???????????? ???????????? SafetyKeeper??? ???????????????????????? ??????????????????!"
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            ????????????
          </SuiTypography>
        </SuiBox>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                placeholder="?????????"
                name="id"
                label="id"
                required
                onChange={handleChange}
                error={Boolean(inputs.id[0]) && !inputs.id[1]}
                autoFocus
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                placeholder="??????"
                name="name"
                required
                onChange={handleChange}
                error={Boolean(inputs.name[0]) && !inputs.name[1]}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                name="pw"
                required
                type="password"
                onChange={handleChange}
                error={Boolean(inputs.pw[0]) && !inputs.pw[1]}
                placeholder="????????????"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                name="pw2"
                label="??????????????????"
                required
                type="password"
                onChange={handleChange}
                error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
                placeholder="??????????????????"
              />
            </SuiBox>
            <Autocomplete
              required
              onChange={(event, newValue) => {
                setInputs({
                  ...inputs,
                  company: [newValue, Boolean(newValue)],
                });
              }}
              disablePortal
              id="company"
              options={companies}
              renderInput={(params) => <TextField {...params} placeholder="?????????" />}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              getOptionLabel={(o) => o.constructionName}
            />
            <SuiBox my={2}>
              <SuiInput placeholder="??????" name="role" required onChange={handleChange} />
            </SuiBox>
            <SuiBox mt={1} mb={5} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                ??????????????? ????????????????&nbsp;
              </SuiTypography>
              <SuiTypography
                onClick={handleClickOpen}
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                ????????????
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="dark" fullWidth onClick={submit}>
                ????????????
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                ?????? ???????????????????&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  ?????????
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>????????????</DialogTitle>
        <DialogContent>
          <SuiInput
            autoFocus
            name="new-company"
            placeholder="?????????"
            onChange={(e) => setCompany(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={handleClose}>??????</SuiButton>
          <SuiButton
            onClick={() => {
              add();
              handleClose();
            }}
          >
            ??????
          </SuiButton>
        </DialogActions>
      </Dialog>
    </BasicLayout>
  );
}

export default SignUp;
