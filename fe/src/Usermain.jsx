import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { DialogComponent } from './component/Dialogs'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from './Common'

export default function Usermain({ user }) {
  const [rooms, setrooms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    updateRooms()
  }, [])

  function addRoom(data) {
    axios
      .post(BASE_URL + '/api/v1/room', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

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
  function updateRooms() {
    axios
      .get(BASE_URL + '/api/v1/room/user', {
        // userId: user.userId
        params: { userId: user },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
      <DialogComponent addRoom={addRoom} />
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
