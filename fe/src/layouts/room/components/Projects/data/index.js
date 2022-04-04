// @mui material components
// import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiAvatar from "components/SuiAvatar";
// import SuiProgress from "components/SuiProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import { Fragment, useEffect, useMemo, useState } from "react";

// import { useNavigate } from "react-router";
import axios from "axios";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { JoinRoomForm } from "../../../../../Forms";
// import { BASE_URL, Div, P } from "../../../../../Common";
// import { DialogComponent } from "../../../../../Dialogs";

export default function Data() {
  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <SuiAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",

  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },

  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   updateRooms();
  // }, []);

  // function addRoom() {
  //   axios
  //     .post(BASE_URL + "/api/v1/room", { roomName, roomPassword: "" })
  //     .then((res) => {
  //       const temp_user = { ...user };
  //       delete temp_user.userPassword;
  //       const data = {
  //         room: {
  //           roomId: res.data.roomId,
  //           roomName: res.data.roomName,
  //         },
  //         user: temp_user,
  //       };
  //       axios
  //         .post(BASE_URL + "/api/v1/room/user", data)
  //         .then((res) => {
  //           updateRooms();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function deleteRoom(roomId) {
  //   axios
  //     .delete(BASE_URL + "/api/v1/room", { roomId })
  //     .then((res) => {
  //       console.log(res);
  //       setRooms(rooms.filter((room) => room.roomId !== roomId));
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function updateRooms() {
  //   console.log(user);
  //   axios
  //     .get(BASE_URL + "/api/v1/room/user", { params: { userId: user.id } })
  //     .then((res) => {
  //       setRooms(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  return {
    columns: [
      { name: "room", align: "left" },
      // { name: "members", align: "left" },
      { name: "budget", align: "center" },
      // { name: "completion", align: "center" },
    ],

    rows: [
      {
        room: [logoXD, "Soft UI XD Version"],
        // members: (
        //   <SuiBox display="flex" py={1}>
        //     {avatars([
        //       [team1, "Ryan Tompson"],
        //       [team2, "Romina Hadid"],
        //       [team3, "Alexander Smith"],
        //       [team4, "Jessica Doe"],
        //     ])}
        //   </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={60} color="info" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
      {
        room: [logoAtlassian, "Add Progress Track"],
        // members: (
        //   <SuiBox display="flex" py={1}>
        //     {avatars([
        //       [team2, "Romina Hadid"],
        //       [team4, "Jessica Doe"],
        //     ])}
        //   </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={10} color="info" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
      {
        room: [logoSlack, "Fix Platform Errors"],
        // members: (
        //   <SuiBox display="flex" py={1}>
        //     {avatars([
        //       [team1, "Ryan Tompson"],
        //       [team3, "Alexander Smith"],
        //     ])}
        //   </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={100} color="success" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
      {
        room: [logoSpotify, "Launch our Mobile App"],
        // members: (
        // <SuiBox display="flex" py={1}>
        //   {avatars([
        //     [team4, "Jessica Doe"],
        //     [team3, "Alexander Smith"],
        //     [team2, "Romina Hadid"],
        //     [team1, "Ryan Tompson"],
        //   ])}
        // </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={100} color="success" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
      {
        room: [logoJira, "Add the New Pricing Page"],
        // members: (
        //   <SuiBox display="flex" py={1}>
        //     {avatars([[team4, "Jessica Doe"]])}
        //   </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={25} color="info" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
      {
        room: [logoInvesion, "Redesign New Online Shop"],
        // members: (
        //   <SuiBox display="flex" py={1}>
        //     {avatars([
        //       [team1, "Ryan Tompson"],
        //       [team4, "Jessica Doe"],
        //     ])}
        //   </SuiBox>
        // ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SuiTypography>
        ),
        // completion: (
        //   <SuiBox width="8rem" textAlign="left">
        //     <SuiProgress value={40} color="info" variant="gradient" label={false} />
        //   </SuiBox>
        // ),
      },
    ],
  };
}
