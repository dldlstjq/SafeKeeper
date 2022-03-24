import { useState, useEffect, Fragment } from 'react'
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
import { Bigbtn, BASE_URL, Gridd, input, Div } from './Common'

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
  const [exist, setExist] = useState(true)

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
    <Fragment>
      <input
        name="id"
        label="id"
        required
        autoFocus
        size="small"
        onChange={handleChange}
        // error={Boolean(inputs.id[0]) && !inputs.id[1] ? 'false' : 'true'}
        // helperText={inputs.id[0] && !inputs.id[1] && '10자 이내'}
      />

      <input
        name="name"
        label="이름"
        required
        size="small"
        onChange={handleChange}
        // error={Boolean(inputs.name[0]) && !inputs.name[1]}
        // helperText={
        //   inputs.name[0] && !inputs.name[1] && '10자 이내 | 문자 허용'
        // }
      />

      <input
        name="pw"
        label="비밀번호"
        required
        type="password"
        size="small"
        onChange={handleChange}
        // error={Boolean(inputs.pw[0]) && !inputs.pw[1]}
        // helperText={
        //   inputs.pw[0] && !inputs.pw[1] && '8~16자 | 문자,숫자,특수기호 포함'
        // }
      />

      <input
        name="pw2"
        label="비밀번호확인"
        required
        type="password"
        size="small"
        onChange={handleChange}
        // error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
        // helperText={inputs.pw2[0] && !inputs.pw2[1] && '일치하지 않습니다'}
      />

      <select name="company">
        <option value="">회사를 선택해주세요</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        name="role"
        label="직책"
        required
        size="small"
        onChange={handleChange}
      />

      {exist ? (
        <button onClick={() => setExist(false)} sx={{ pl: 1 }}>
          회사목록에 없나요?
        </button>
      ) : (
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
      )}

      <Bigbtn
        onClick={submit}
        variant="contained"
        disabled={!allClear()}
        sx={{ ml: '60%' }}
      >
        회원 등록
      </Bigbtn>
    </Fragment>
  )
}

export function LoginForm({ setuser }) {
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
        const accessToken = res.data.accessToken
        axios
          .get(BASE_URL + '/api/v1/users/me')
          .then((res) => {
            localStorage.setItem('user', {
              accessToken: accessToken,
              userId: res.data.userId,
            })
            setuser({
              accessToken: accessToken,
              userId: res.data.userId,
            })
          })
          .catch((err) => console.log(err))
        navigate('/usermain')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <form onSubmit={submit}>
        <input name="id" label="아이디" required size="small" />

        <input
          name="pw"
          label="비밀번호"
          required
          size="small"
          type="password"
        />

        <button
          type="submit"
          //  variant="contained"
        >
          로그인
        </button>
      </form>
    </Fragment>
  )
}
