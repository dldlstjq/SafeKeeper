import styled from "@emotion/styled";
import { Button, Grid, TextField } from "@mui/material";

export const BASE_URL = "http://localhost:8080";

export const Div = styled.div`
  // background-color: grey;
  // border: 1px solid white;
  height: 80px;
  display: inline-block;
  width: 49%;
`;
export const Bigbtn = styled(Button)`
  height: 75px;
  background-color: silver;
  font-size: 16px;
  color: black;
  font-weight: bold;
  // border: 1mm solid black;
  border-radius: 10%;
`;
export const Gridd = styled(Grid)`
  // border: 2px solid black;
`;
export const TextFieldPadding = styled(TextField)`
  // padding: 0 8px;
  width: 75%;
`;
