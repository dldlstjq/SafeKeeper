import { Fragment, useState } from 'react'
import axios from 'axios'

function RoomCreateForm({ addroom }) {
  const [roomname, setroomname] = useState('')
  return (
    <Fragment>
      <input
        type="text"
        placeholder="방이름"
        onChange={(e) => setroomname(e.target.value)}
      />
      <button></button>
    </Fragment>
  )
}

export default RoomCreateForm
