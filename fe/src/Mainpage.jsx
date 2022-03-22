import { Bigbtn } from "./Common";
import { Box, } from "@mui/system";
import { useNavigate } from "react-router-dom";



export default function Mainpage(){
	const navigate = useNavigate()
	
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		}}>
			<Bigbtn variant='contained' onClick={()=>navigate('signup')}>회원가입</Bigbtn>
			<Bigbtn variant='contained' onClick={()=>navigate('login')}>로그인</Bigbtn>
			<Bigbtn variant='contained'>참가</Bigbtn>
		</Box>
	)
}