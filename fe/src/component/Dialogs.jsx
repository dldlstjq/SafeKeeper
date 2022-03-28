import { useState, Fragment } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// import DialogContentText from '@mui/material/DialogContentText'
import { SignupForm, LoginForm } from '../Forms'
import { Bigbtn, P } from '../Common'

export function DialogComponent({ title, children, ...props }) {
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
      <P
        color={props.color}
        margin={props.margin}
        size={props.size}
        onClick={handleClickOpen}
      >
        {title}
      </P>
      <Dialog open={open} onClose={() => handleClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            //여기서 dialog 크기 조정. 왠만하면 건들지 말것.
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
