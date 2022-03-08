import {useState,} from 'react'
import { TextField, Button, } from '@mui/material'
import styled from '@emotion/styled'
import axios from 'axios'

const Form = styled.form`
	margin: 10px;
	background-color: hotpink;
`
const WhiteTextField = styled(TextField)`
	background-color: white;
	margin: 10px;
`

export function SignupForm(){
	const [inputs,setInputs]=useState({
		id:['',false],
		name:['',false],
		team:['',false],
		const_id:['',false],
		pw:['',false],
		pw2:['',false],
	})

	function allClear(){
		for (const key in inputs) {
			if (!inputs[key][1]) {
				return false
			} 
		}
		return true
	}
	

	function submit(e){
		e.preventDefault();
		// axios.post(url,data:inputs,)
	}

	function validate(name,val){
		switch (name) {
			case 'id':
				return val.length<=10
			case 'pw':
				return val.length>=8 && val.length<=16 && /\d/.test(val) && /\w/.test(val) && /\W/.test(val)
			case 'pw2':
				return val===inputs.pw[0]
			case 'name':
				return val.length<=10 && !/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]/.test(val)
			case 'team':
				return val.length<=45
			case 'const_id':
				return val.length<=10
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
		if (name==='pw') {
			if (value!==inputs.pw2[0]) {
				setInputs({
					...inputs,
					pw2:[inputs.pw2[0],false]
				})
			} else {
				setInputs({
					...inputs,
					pw2:[inputs.pw2[0],true]
				})
			} 
		}
	}

	return(
		<Form onSubmit={submit}>
			<WhiteTextField 
				name="id"
				label="id"
				required
				autoFocus
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.id[0]) && !inputs.id[1]}
				helperText={inputs.id[0] && !inputs.id[1] && '10자 이내'}
			/>
			<WhiteTextField 
				name="name"
				label="이름"
				required
				size='small'
				onChange={handleChange}
			/>
			<WhiteTextField 
				name="const_id"
				label="건설공사고유번호"
				required
				size='small'
				onChange={handleChange}
			/>
			<WhiteTextField 
				name="team"
				label="팀"
				required
				size='small'
				onChange={handleChange}
			/>
			<WhiteTextField 
				name="pw"
				label="비밀번호"
				required
				type='password'
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.pw[0]) && !inputs.pw[1]}
				helperText={inputs.pw[0] && !inputs.pw[1] && '8~16자 | 문자,숫자,특수기호 포함'}
			/>
			<WhiteTextField 
				name="pw2"
				label="비밀번호확인"
				required
				type='password'
				size='small'
				onChange={handleChange}
				error={Boolean(inputs.pw2[0]) && !inputs.pw2[1]}
				helperText={inputs.pw2[0] && !inputs.pw2[1] && '일치하지 않습니다'}
			/>
			<Button type='submit' variant='contained' disabled={!allClear()}>회원등록</Button>
		</Form>
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
			<WhiteTextField 
				name="id"
				label="아이디"
				required
				size='small'
			/>
			<WhiteTextField 
				name="pw"
				label="비밀번호"
				required
				size='small'
			/>
			<Button type='submit' variant='contained'>로그인</Button>
		</Form>
	)
}