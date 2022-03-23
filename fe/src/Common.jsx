import styled from '@emotion/styled'
import { Button, Grid, TextField } from '@mui/material'

// console.log('common')
export const BASE_URL = 'http://j6d101.p.ssafy.io:8080'

export const Div = styled.div`
  background-color: gold;
  // border: 1px solid white;
  height: 80px;
  display: inline-block;
  width: 49%;
`
export const Bigbtn = styled(Button)`
  height: 75px;
  background-color: silver;
  font-size: 16px;
  color: black;
  font-weight: bold;
  border-radius: 10%;
  // border: 1mm solid black;
`
export const Gridd = styled(Grid)`
  border: 2px solid black;
`
export const TextFieldPadding = styled(TextField)`
  // padding: 0 8px;
  width: 75%;
  background-color: white;
`
