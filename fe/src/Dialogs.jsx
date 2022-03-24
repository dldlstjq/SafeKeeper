import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// import DialogContentText from '@mui/material/DialogContentText'
import { SignupForm, LoginForm } from './Forms'
import { Bigbtn } from './Common'

export function DialogComponent({ title, children }) {
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
      <Bigbtn onClick={handleClickOpen}>{title}</Bigbtn>
      <Dialog open={open} onClose={() => handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            onClick={() => {
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
