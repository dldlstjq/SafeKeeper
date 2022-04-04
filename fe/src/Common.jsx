// props를 받을 수 있는 html 엘리먼트들을 첫문자를 대문자로 정의
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { Grid, TextField } from '@mui/material'

export const BASE_URL = 'http://j6d101.p.ssafy.io'

export const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
export const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
  background-color: silver;
  width: 30%;
  max-height: 50%;
`
export const GRID = styled(Grid)`
  // border: 1px solid black;
`
export const Input = styled.input`
  margin: 0 0 5px;
`
export const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
`
export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`
