// 마운트 시 회사리스트를 가져와야한다

import {useState,useEffect} from 'react'
import { TextField, Button, Grid, Autocomplete,FormControl,InputLabel,OutlinedInput,IconButton,InputAdornment,} from '@mui/material'
import styled from '@emotion/styled'
import { Bigbtn } from './Mainpage'
// import {VisibilityOff, Visibility} from '@mui/icons-material'
import axios from 'axios'
const BASE_URL='https://73d4-118-38-0-42.ngrok.io'


const Form = styled.form`
	background-color: violet;
  margin:10px;
  `
  const TextFieldMargin = styled(TextField)`
	margin: 10px;
  `
  
export function SignupForm(){
  const [inputs,setInputs]=useState({
    id:['',false],
		name:['',false],
		team:['',false],
		// const_name:['',false],
		pw:['',false],
		pw2:['',false],
	})
  const [company,setCompany]=useState('a')
  const {pw,pw2} = inputs
  useEffect(() => { 
    if (pw[0]!==pw2[0]){
      setInputs({...inputs,pw2:[inputs.pw2[0],false]})
    } else {setInputs({...inputs,pw2:[inputs.pw2[0],true]})}
  },[pw])
	function allClear(){
		for (const key in inputs) {
      if (!inputs[key][1]) {
				return false
			} 
		}
		return true
	}
	function submit(e){
    const data = {id:inputs}
    // console.log(inputs);
	}
	function validate(name,val){
		switch (name) {
      case 'id':
        return Boolean(val) && val.length<=10
        case 'pw':
          return Boolean(val) && val.length<=16 && /\d/.test(val) && /\w/.test(val) && /\W/.test(val)
			case 'pw2':
				return val===inputs.pw[0]
			case 'name':
				return Boolean(val) && val.length<=10 && !/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]/.test(val)
			case 'team':
        return Boolean(val) && val.length<=45
      case 'const_name':
        return Boolean(val) && val.length<=30
			default:
				break;
		}
	}
	function handleChange(e){
		const {name,value}=e.target
		setInputs({
			...inputs,
			[name]:[value,validate(name,value)]
		})
	}
  function add(){
    axios.post(BASE_URL+'/api/v1/construction',{'constructName':'abc'})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  const x = [{label:'a',id:1},{label:'b',id:2},{label:'회사가 없으세요?',id:3}]
  
	return(
		<div>
  		{/* <Autocomplete
        // value={company}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          // }}
        // getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.label}
        onChange={(e)=>handleChange(e)}
        id="company"
        options={x}
        sx={{ width: 300 }}
        renderInput={(params) => <TextFieldMargin {...params} size='small' label="회사선택" />}
      /> */}
      <TextFieldMargin 
				name="id"
				label="id"
				required
				autoFocus
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.id[0]) && !inputs.id[1]}
				helperText={inputs.id[0] && !inputs.id[1] && '10자 이내'}
			/>
			<TextFieldMargin 
				name="name"
				label="이름"
				required
				size='small'
				onChange={handleChange}
        error={Boolean(inputs.name[0]) && !inputs.name[1]}
				helperText={inputs.name[0] && !inputs.name[1] && '10자 이내 | 문자 허용'}
			/>
		  <FormControl sx={{ m: 1, width: '25ch' }} size='small'>
        <InputLabel htmlFor="outlined-adornment-password">회사등록</InputLabel>
        <OutlinedInput
          id="addCompany"
          onChange={(e)=>setCompany(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button variant='contained' size='small' onClick={add} >등록</Button>
              {/* <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton> */}
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
			<TextFieldMargin 
				name="team"
				label="팀"
				required
				size='small'
				onChange={handleChange}
			/>
			<TextFieldMargin 
				name="pw"
				label="비밀번호"
				required
				type='password'
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.pw[0]) && !inputs.pw[1]}
				helperText={inputs.pw[0] && !inputs.pw[1] && '8~16자 | 문자,숫자,특수기호 포함'}
			/>
			<TextFieldMargin 
				name="pw2"
				label="비밀번호확인"
				required
				type='password'
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
				helperText={inputs.pw2[0] && !inputs.pw2[1] && '일치하지 않습니다'}
			/>
			<Bigbtn onClick={()=>submit()} variant='contained' disabled={!allClear()}>회원등록</Bigbtn>
		</div>
	)
}

export function LoginForm(){
	function submit(e){
		e.preventDefault()
		const data = new FormData(e.currentTarget);
    // axios.post()
		console.log({
      id: data.get('id'),
      password: data.get('pw'),
    });
	}

	return (
		<Form onSubmit={submit}>
			<TextFieldMargin 
				name="id"
				label="아이디"
				required
				size='small'
			/>
			<TextFieldMargin 
				name="pw"
				label="비밀번호"
				required
				size='small'
			/>
			<Button type='submit' variant='contained'>로그인</Button>
		</Form>
	)
}