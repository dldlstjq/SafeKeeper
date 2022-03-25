import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { DialogComponent } from './component/Dialogs'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL, Div } from './Common'

export default function Usermain({ user }) {
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    updateRooms()
  }, [])

  function addRoom() {
    axios
      .post(BASE_URL + '/api/v1/room', { roomName, roomPassword: '' })
      .then((res) => {
        const temp_user = { ...user }
        delete temp_user.userPassword
        const data = {
          room: {
            roomId: res.data.roomId,
            roomName: res.data.roomName,
          },
          user: temp_user,
        }
        axios
          .post(BASE_URL + '/api/v1/room/user', data)
          .then((res) => {
            updateRooms()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => console.log(err))
  }

  function deleteRoom(id) {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  function enter(id) {
    //axios
    navigate('/room/' + id)
  }

  function updateRooms() {
    axios
      .get(BASE_URL + '/api/v1/room/user', { params: { userId: user.id } })
      .then((res) => {
        setRooms(res.data)
      })
      .catch((err) => console.log(err))
  }

  function onkeyup(e) {
    if (e.keyCode === 13) {
      addRoom(e)
      e.target.disabled = true
    }
  }

  return (
    <Div>
      <input
        type="text"
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="방 이름을 입력하고 추가해주세요"
        onKeyUp={(e) => onkeyup(e)}
        style={{ width: '40%', marginTop: '10%' }}
      />
      <div
        style={{
          display: 'flex',
          flexFlow: 'column wrap',
          width: '90%',
          margin: '20% 0 5%',
        }}
      >
        {rooms.map((room) => (
          <Room
            key={room.roomId}
            roomName={room.roomName}
            roomId={room.roomId}
            deleteRoom={deleteRoom}
            enter={enter}
          />
        ))}
      </div>
    </Div>
  )
}

function Room({ roomName, roomId, deleteRoom, enter }) {
  return (
    <div style={{ width: '33%', marginBottom: 5 }}>
      <button onClick={() => enter(roomId)} style={{ width: '60%' }}>
        {roomName}
      </button>
      <button onClick={() => deleteRoom(roomId)}>삭제</button>
    </div>
  )
}
