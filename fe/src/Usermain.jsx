import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { RoomDialog } from './Dialogs'
import { useNavigate } from 'react-router'

export default function Usermain() {
  const [rooms, setrooms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setrooms([
      { name: 'hi1', info: 'xxx', id: 1 },
      { name: 'hi2', info: 'xxx', id: 2 },
      { name: 'hi3', info: 'xxx', id: 3 },
    ])
  }, []) //방리스트 요청

  function deleteRoom(id) {
    // axios.get(BASE_URL+'/api/v1/construction/getConstruction')
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err))
    setrooms(rooms.filter((room) => room.id !== id))
  }
  function enter(id) {
    //axios
    navigate('/room/' + id)
  }

  return (
    <>
      {/* <button onClick={}>방 추가</button> */}
      {rooms.map((room) => (
        <Room
          key={room.id}
          roomName={room.name}
          roomId={room.id}
          deleteRoom={deleteRoom}
          enter={enter}
        />
      ))}
      <RoomDialog btn={'방 추가'} />
    </>
  )
}

const ThinDiv = styled.div`
  width: 30%;
  background-color: silver;
  // border: solid black;
  border-radius: 5px;
  display: inline-block;
  margin: 10px 20px;
`

function Room({ roomName, roomId, deleteRoom, enter }) {
  return (
    <ThinDiv>
      {roomName}
      <button onClick={() => deleteRoom(roomId)}>x</button>
      <button onClick={() => enter(roomId)}>입장</button>
    </ThinDiv>
  )
}
