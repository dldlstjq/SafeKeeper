import { useState, Fragment } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// import DialogContentText from '@mui/material/DialogContentText'
import { SignupForm, LoginForm } from '../Forms'
import { Bigbtn } from '../Common'

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
    <Fragment>
      {/* <Bigbtn onClick={handleClickOpen}>{title}</Bigbtn> */}
      <p
        style={{
          fontSize: '1.5em',
          color: 'sandybrown',
          margin: '15px 20px 0 0',
        }}
        onClick={handleClickOpen}
      >
        {title}
      </p>
      <Dialog open={open} onClose={() => handleClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // height: '50vh',
            width: '25vw',
          }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
