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
    axios
      .get(BASE_URL + "/api/v1/construction/getConstruction")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));
  }, []);

  function allClear() {
    for (const key in inputs) {
      if (!inputs[key][1]) return false;
    }
    return true;
  }
  function submit(e) {
    e.preventDefault();
    if (!allClear()) {
      alert("폼을 확인해주세요\n비밀번호는 8-16자 문자,숫자,특수기호를 포함해야합니다");
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
        return Boolean(val) && val.length <= 10 && !/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]/.test(val);
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <BasicLayout
      title="환영합니다!"
      description="아이디를 생성하여 SafetyKeeper의 안전알림서비스를 사용해보세요!"
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            회원가입
          </SuiTypography>
        </SuiBox>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                placeholder="아이디"
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
                placeholder="이름"
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
                placeholder="비밀번호"
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                name="pw2"
                label="비밀번호확인"
                required
                type="password"
                onChange={handleChange}
                error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
                placeholder="비밀번호확인"
              />
            </SuiBox>
            <Autocomplete
              onChange={(event, newValue) => {
                // console.log(newValue);
                setInputs({
                  ...inputs,
                  company: [newValue, Boolean(newValue)],
                });
              }}
              disablePortal
              id="company"
              options={companies}
              renderInput={(params) => <TextField {...params} placeholder="회사명" />}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              getOptionLabel={(o) => o.constructionName}
            />
            <SuiBox my={2}>
              <SuiInput placeholder="직책" name="role" required onChange={handleChange} />
            </SuiBox>
            <SuiBox mt={1} mb={5} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                회사목록에 없으신가요?&nbsp;
              </SuiTypography>
              <SuiTypography
                onClick={handleClickOpen}
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                회사등록
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" color="dark" fullWidth onClick={submit}>
                회원가입
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                이미 회원이신가요?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  로그인
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회사등록</DialogTitle>
        <DialogContent>
          <SuiInput
            autoFocus
            name="new-company"
            placeholder="회사명"
            onChange={(e) => setCompany(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={handleClose}>취소</SuiButton>
          <SuiButton onClick={add}>등록</SuiButton>
        </DialogActions>
      </Dialog>
    </BasicLayout>
  );
}

export default SignUp;
