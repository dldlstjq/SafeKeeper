import { Fragment, useEffect, useMemo, useState } from 'react'
import { DialogComponent } from './component/Dialogs'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL, Div, P } from './Common'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { JoinRoomForm } from './Forms'

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

  // addRoom2(){
  //   return new Promise((resolve,reject)=>{

  //   })
  // }

  function deleteRoom(roomId) {
    axios
      .delete(BASE_URL + '/api/v1/room', { roomId })
      .then((res) => {
        console.log(res)
        setRooms(rooms.filter((room) => room.roomId !== roomId))
      })
      .catch((err) => console.log(err))
  }

  function enter(id) {
    // navigate('/room/' + id)
    navigate('/openvidu')
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
      e.target.value = ''
      e.target.disabled = true
      setTimeout(() => {
        e.target.disabled = false
      }, 4000)
      console.log(rooms)
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
      <P color="aliceblue" size="150%" margin="0">
        또는
      </P>
      <DialogComponent
        title={'다른 방에 참가하기'}
        color="sandybrown"
        margin="0"
        size="18px"
      >
        <JoinRoomForm user={user} />
      </DialogComponent>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column wrap',
          width: '90%',
          margin: '20% 0 5%',
          maxHeight: '60%',
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
    <div style={{ maxWidth: '50%', marginBottom: 5, display: 'flex' }}>
      <button
        onClick={() => enter(roomId)}
        style={{ width: '70%', height: 30 }}
      >
        {roomName}
      </button>
      <button name="favorite" onClick={() => deleteRoom(roomId)}>
        <DeleteForeverIcon fontSize="small" />
      </button>
    </div>
  )
}
