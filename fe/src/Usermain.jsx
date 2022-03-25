import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { DialogComponent } from './component/Dialogs'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from './Common'

export default function Usermain({ user }) {
  const [rooms, setRooms] = useState([])
  const [roomname, setRoomname] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    updateRooms()
  }, [])

  function addRoom() {
    axios
      .post(BASE_URL + '/api/v1/room', { roomName: roomname, roomPassword: '' })
      .then((res) => {
        const data = {
          room: {
            roomId: res.data.roomId,
            roomName: res.data.roomName,
          },
          user: {
            construction: {
              constructName: 'string',
              constructionId: 0,
            },
            id: 0,
            userId: 'string',
            userName: 'string',
            userRole: 'string',
          },
        }
        axios
          .post(BASE_URL + '/api/v1/room/user', data)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => console.log(err))
  }

  function deleteRoom(id) {
    // axios.get(BASE_URL+'/api/v1/construction/getConstruction')
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err))
    setRooms(rooms.filter((room) => room.id !== id))
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
      <input
        type="text"
        onChange={(e) => setRoomname(e.target.value)}
        placeholder="방 이름"
      />
      <button onClick={addRoom}>방 생성</button>
      {rooms.map((room) => (
        <Room
          key={room.id}
          roomName={room.name}
          roomId={room.id}
          deleteRoom={deleteRoom}
          enter={enter}
        />
      ))}
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
