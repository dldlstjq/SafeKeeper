import styled from '@emotion/styled'
import { Button, Grid, TextField } from '@mui/material'

export const BASE_URL = 'http://j6d101.p.ssafy.io:8080'

export const Div = styled.div`
  // background-color: gold;
  // border: 1px solid white;
  height: 100vh;
  // width: 49%;
  // display: inline-block;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`
export const Bigbtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
  background-color: pink;
  width: 20%;
  // color: black;
  // height: 50vh;
  // border-radius: 10%;
  // border: 1mm solid black;
`
export const Gridd = styled(Grid)`
  // border: 2px solid black;
`
export const TextFieldPadding = styled(TextField)`
  // padding: 0 8px;
  width: 75%;
  background-color: white;
`
export const MarginInput = styled.input`
  margin: 0 0 5px;
`
