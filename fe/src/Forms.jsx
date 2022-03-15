import { useState, useEffect } from 'react'
import {
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'
import Brightness3Icon from '@mui/icons-material/Brightness3'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Bigbtn, BASE_URL, Gridd, TextFieldPadding, Div } from './Common'
import { width } from '@mui/system'

export function SignupForm() {
  const navigate = new useNavigate()
  const [inputs, setInputs] = useState({
    id: ['', false],
    name: ['', false],
    role: ['', false],
    company: ['', false],
    pw: ['', false],
    pw2: ['', false],
  })
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState('')
  const [exist, setexist] = useState(true)

  const { pw, pw2 } = inputs
  const updateFlag = Boolean(company)

  useEffect(() => {
    if (pw[0] !== pw2[0]) {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], false] })
    } else {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], true] })
    }
  }, [pw])

  useEffect(() => {
    axios
      .get(BASE_URL + '/api/v1/construction/getConstruction')
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err))
  }, [updateFlag])

  function allClear() {
    for (const key in inputs) {
      if (!inputs[key][1]) return false
    }
    return true
  }
  function submit(e) {
    const data = {
      construction: inputs.company[0],
      id: inputs.id[0],
      name: inputs.name[0],
      password: inputs.pw[0],
      role: inputs.role[0],
    }
    axios
      .post(BASE_URL + '/api/v1/users', data)
      .then(() => navigate('/login'))
      .catch((err) => console.log(err))
  }
  function validate(name, val) {
    switch (name) {
      case 'id':
        return Boolean(val) && val.length <= 10
      case 'pw':
        return (
          val.length >= 8 &&
          val.length <= 16 &&
          /\d/.test(val) &&
          /\w/.test(val) &&
          /\W/.test(val)
        )
      case 'pw2':
        return val === inputs.pw[0]
      case 'name':
        return (
          Boolean(val) &&
          val.length <= 10 &&
          !/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]/.test(val)
        )
      case 'role':
        return Boolean(val) && val.length <= 45
      default:
        break
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: [value, validate(name, value)],
    })
  }

  function add() {
    axios
      .post(BASE_URL + '/api/v1/construction', { constructName: company })
      .then(setCompany(''))
      .catch((err) => console.log(err))
  }

  return (
    <Gridd container>
      <Gridd item xs={2} />

      <Gridd item container xs={6} columnSpacing={1}>
        <Gridd item container xs={12} marginY={4}>
          <Brightness3Icon sx={{ color: 'silver', fontSize: 100, mx: '35%' }} />
        </Gridd>

        <Gridd item xs={12}>
          <Div>
            <TextFieldPadding
              name="id"
              label="id"
              required
              autoFocus
              size="small"
              onChange={handleChange}
              error={Boolean(inputs.id[0]) && !inputs.id[1]}
              helperText={inputs.id[0] && !inputs.id[1] && '10자 이내'}
            />
          </Div>
          <Div>
            <TextFieldPadding
              name="name"
              label="이름"
              required
              size="small"
              onChange={handleChange}
              error={Boolean(inputs.name[0]) && !inputs.name[1]}
              helperText={
                inputs.name[0] && !inputs.name[1] && '10자 이내 | 문자 허용'
              }
            />
          </Div>
          <Div>
            <TextFieldPadding
              name="pw"
              label="비밀번호"
              required
              type="password"
              size="small"
              onChange={handleChange}
              error={Boolean(inputs.pw[0]) && !inputs.pw[1]}
              helperText={
                inputs.pw[0] &&
                !inputs.pw[1] &&
                '8~16자 | 문자,숫자,특수기호 포함'
              }
            />
          </Div>
          <Div>
            <TextFieldPadding
              name="pw2"
              label="비밀번호확인"
              required
              type="password"
              size="small"
              onChange={handleChange}
              error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
              helperText={
                inputs.pw2[0] && !inputs.pw2[1] && '일치하지 않습니다'
              }
            />
          </Div>
          <Div>
            <Autocomplete
              onChange={(event, newValue) => {
                console.log(newValue)
                setInputs({
                  ...inputs,
                  company: [newValue, Boolean(newValue)],
                })
              }}
              size="small"
              disablePortal
              id="company"
              options={companies}
              renderInput={(params) => (
                <TextFieldPadding
                  {...params}
                  sx={{ width: '75%' }}
                  label="회사선택"
                />
              )}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              getOptionLabel={(o) => o.constructionName}
            />
          </Div>
          <Div>
            <TextFieldPadding
              name="role"
              label="직책"
              required
              size="small"
              onChange={handleChange}
            />
          </Div>
          {exist ? (
            <button onClick={() => setexist(false)} sx={{ pl: 1 }}>
              회사목록에 없나요?
            </button>
          ) : (
            <Div>
              <FormControl size="small" sx={{ width: '75%' }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  회사등록
                </InputLabel>
                <OutlinedInput
                  id="addCompany"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" size="small" onClick={add}>
                        등록
                      </Button>
                    </InputAdornment>
                  }
                  label="x"
                />
              </FormControl>
            </Div>
          )}
        </Gridd>
        <Bigbtn
          onClick={submit}
          variant="contained"
          disabled={!allClear()}
          sx={{ ml: '60%' }}
        >
          회원 등록
        </Bigbtn>
      </Gridd>
      {/* <Gridd item xs={4} display="flex" alignItems="end">
        
      </Gridd> */}
    </Gridd>
  )
}

export function LoginForm() {
  const navigate = useNavigate()
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    axios
      .post(BASE_URL + '/api/v1/auth/login', {
        id: data.get('id'),
        password: data.get('pw'),
      })
      .then((res) => {
        localStorage.setItem('jwt', res.data.accessToken)
        navigate('/usermain')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Div>
      <form onSubmit={submit}>
        <Div>
          <TextFieldPadding name="id" label="아이디" required size="small" />
        </Div>
        <Div>
          <TextFieldPadding
            name="pw"
            label="비밀번호"
            required
            size="small"
            type="password"
          />
        </Div>
        <Button type="submit" variant="contained">
          로그인
        </Button>
      </form>
    </Div>
  )
}
