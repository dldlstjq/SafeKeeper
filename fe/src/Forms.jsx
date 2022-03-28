import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button, BASE_URL, GRID, Input, Div, Form } from './Common'

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
  // const updateFlag = Boolean(company)

  useEffect(() => {
    if (pw[0] !== pw2[0]) {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], false] })
    } else {
      setInputs({ ...inputs, pw2: [inputs.pw2[0], true] })
    }
  }, [pw])

  useEffect(
    () =>
      axios
        .get(BASE_URL + '/api/v1/construction/getConstruction')
        .then((res) => setCompanies(res.data))
        .catch((err) => console.log(err)),
    []
  )

  function allClear() {
    for (const key in inputs) {
      if (!inputs[key][1]) return false
    }
    return true
  }
  function submit(e) {
    const construction = companies.find(
      (construction) => construction.constructionName === inputs.company[0]
    )
    if (!construction) {
      alert('회사를 확인해주세요')
      return
    }
    const data = {
      construction: construction,
      id: inputs.id[0],
      name: inputs.name[0],
      password: inputs.pw[0],
      role: inputs.role[0],
    }
    console.log(data)
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
      .then((res) => {
        document.getElementById('company-to-add').value = ''
        axios
          .get(BASE_URL + '/api/v1/construction/getConstruction')
          .then((res) => setCompanies(res.data))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <Input
        name="id"
        required
        autoFocus
        placeholder="아이디(10자 이내)"
        onChange={handleChange}
      />

      <Input name="name" required onChange={handleChange} placeholder="이름" />

      <Input
        name="pw"
        required
        type="password"
        onChange={handleChange}
        placeholder="비밀번호(8~16자, 숫자,문자,특수기호)"
      />

      <Input
        name="pw2"
        placeholder="비밀번호확인"
        required
        type="password"
        onChange={handleChange}
      />

      <input
        type="search"
        name="company"
        style={{ margin: '15px 0 0', height: 22 }}
        required
        placeholder="회사"
        list="list-of-companies"
        onChange={(e) => {
          setInputs({ ...inputs, company: [e.target.value, true] })
        }}
      />
      <datalist id="list-of-companies">
        {companies.map((company) => (
          <option
            value={company.constructionName}
            key={company.constructionId}
          />
        ))}
      </datalist>

      {exist ? (
        <button
          onClick={() => setExist(false)}
          style={{ margin: '0 0 15px 0' }}
        >
          회사목록에 없나요?
        </button>
      ) : (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            id="company-to-add"
            onChange={(e) => setCompany(e.target.value)}
            placeholder="등록할 회사를 입력해주세요"
            style={{ width: '68%', height: '18px', display: 'inline' }}
          />
          <button
            style={{ width: '28%', height: '100%', display: 'inline' }}
            onClick={() => add()}
          >
            등록
          </button>
        </div>
      )}
      <Input name="role" placeholder="직책" required onChange={handleChange} />

      <button
        onClick={submit}
        variant="contained"
        disabled={!allClear()}
        style={{ marginTop: '15px' }}
      >
        회원 등록
      </button>
    </Fragment>
  )
}

export function LoginForm({ setUser }) {
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
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        axios
          .get(BASE_URL + '/api/v1/users/me')
          .then((res) => {
            setUser(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/usermain')
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <form
        onSubmit={submit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Input name="id" label="아이디" required size="small" />

        <Input
          name="pw"
          label="비밀번호"
          required
          size="small"
          type="password"
        />

        <button type="submit" style={{ marginTop: 20 }}>
          로그인
        </button>
      </form>
    </Fragment>
  )
}

export function JoinRoomForm({ user }) {
  const [inputs, setInputs] = useState({})
  function submit() {
    const data = {
      room: inputs,
      user,
    }
    axios
      .post(BASE_URL + '/api/v1/room/user', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <Form onSubmit={() => submit()}>
      <Input
        name="roomId"
        onChange={(e) => setInputs({ ...inputs, roomId: e.target.value })}
        placeholder="방 아이디"
        autoFocus
      />
      <Input
        placeholder="방 이름"
        name="roomName"
        onChange={(e) => setInputs({ ...inputs, roomName: e.target.value })}
      />
      <button type="submit">참가</button>
    </Form>
  )
}
