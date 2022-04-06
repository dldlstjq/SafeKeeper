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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Materail-UI example components
// import Table from "examples/Tables/Table";

// Data
import data from "layouts/room/components/Projects/data";

import { useNavigate } from "react-router";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BASE_URL } from "index";
import { Fragment, useEffect, useMemo } from "react";
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";

import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// 방 추가 모달
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const navigate = useNavigate();

  useEffect(() => {
    updateRooms();
  }, []);

  function addRoom() {
    axios
      .post(BASE_URL + "/api/v1/room", { roomName, roomPassword: "" })
      .then((res) => {
        const temp_user = { ...user };
        delete temp_user.userPassword;
        const data = {
          room: {
            roomId: res.data.roomId,
            roomName: res.data.roomName,
          },
          user: temp_user,
        };
        axios
          .post(BASE_URL + "/api/v1/room/user", data)
          .then((res) => {
            updateRooms();
          })
          .catch((err) => {
            console.log(err);
          });
        setOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function deleteRoom(roomId) {
    console.log(typeof roomId);
    axios
      .delete(BASE_URL + "/api/v1/room", { params: { roomId: roomId } })
      .then((res) => {
        console.log(res);
        setRooms(rooms.filter((room) => room.roomId !== roomId));
      })
      .catch((err) => console.log(err));
  }

  function updateRooms() {
    console.log(user);
    axios
      .get(BASE_URL + "/api/v1/room/user", { params: { userId: user.id } })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch((err) => console.log(err));
  }

  function enterRoom() {
    navigate("/openvidu");
    // alert("방 입장");
  }

  function Room({ roomName, roomId, deleteRoom /*, enter*/ }) {
    return (
      <div style={{ maxWidth: "50%", marginBottom: 5, display: "flex" }}>
        <button
          // onClick={() => enter(roomId)}
          style={{ width: "70%", height: 30 }}
        >
          {roomName}
        </button>
        <button name="favorite" onClick={() => deleteRoom(roomId)}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>
    );
  }

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiBox>
          <SuiTypography variant="h6" gutterBottom>
            방 참가
          </SuiTypography>
        </SuiBox>

        <SuiBox color="text" px={2}>
          <Icon
            sx={{ cursor: "pointer", fontWeight: "bold", color: green[500] }}
            fontSize="large"
            onClick={handleClickOpen}
          >
            add_circle
          </Icon>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"방 생성"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">
                대충 내용 어쩌구 저쩌구
              </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                placeholder="방 이름을 입력"
                // label="Email Address"
                // type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setRoomName(e.target.value)}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={addRoom} autoFocus>
                등록
              </Button>
            </DialogActions>
          </Dialog>
        </SuiBox>
        {/* {renderMenu} */}
      </SuiBox>

      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <SuiBox component="thead">
            <TableRow>
              <SuiBox
                component="th"
                width={"auto"}
                pt={1.5}
                pb={1.25}
                pl={5}
                // pr={align === "right" ? pr : 3}
                textAlign="left"
                fontSize={size.sm}
                fontWeight={fontWeightBold}
                color="secondary"
                opacity={0.7}
                // borderBottom={`${borderWidth[1]} solid ${light.main}`}
              >
                방 이름
              </SuiBox>
            </TableRow>
          </SuiBox>

          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room.roomId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <SuiBox
                    component="th"
                    width={"auto"}
                    pt={1.5}
                    pb={1.25}
                    pl={3}
                    // pr={align === "right" ? pr : 3}
                    textAlign="left"
                    fontSize={size.xl}
                    fontWeight={fontWeightBold}
                    color="black"
                    // opacity={0.7}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    // borderBottom={`${borderWidth[1]} solid ${light.main}`}
                    onClick={() => enterRoom()}
                  >
                    {room.roomName}
                  </SuiBox>
                </TableCell>
                <TableCell align="right">
                  <DeleteForeverIcon
                    fontSize="medium"
                    onClick={() => deleteRoom(room.roomId)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Card>
  );
}

export default Projects;
