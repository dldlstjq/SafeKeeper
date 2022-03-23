import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// import DialogContentText from '@mui/material/DialogContentText'

export function RoomDialog({ btn, addRoom }) {
  const [open, setOpen] = useState(false)
  const [data, setdata] = useState(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btn}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>방 생성</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="roomName"
            label="방 제목"
            fullWidth
            variant="standard"
            onChange={(e) => setdata({ ...data, roomName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="pw"
            label="비밀번호"
            fullWidth
            variant="standard"
            onChange={(e) => setdata({ ...data, roomPassword: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            onClick={() => {
              addRoom(data)
              handleClose()
            }}
          >
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
