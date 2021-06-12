import React from 'react'
import {ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,DialogContentText,
  TextField,
  DialogActions,
  Button,
  Card,
  Link
} from '@material-ui/core'
import useWhatsappLink from '../helpers/useWhatsappLink'
import {Edit, Delete, Call} from '@material-ui/icons';
import {CountContext} from './CountrySelector'


export default function WhatsappLink({number, name, index}: {number: string, name: string, index: number}){
  const {href} = useWhatsappLink({phone: number})
  const [dialog, setDialog] = React.useState<'edit' | 'delete' | null>(null)
  const {history, setHistory} = React.useContext(CountContext)
  
  function handleSave(userName: string) {
    const newHistory = [...history]
    newHistory.splice(index, 1, {name: userName, number})
    setHistory(newHistory)
    setDialog(null)
  }

  function handleDelete() {
    const newHistory = [...history]
    newHistory.splice(index, 1)
    setHistory(newHistory)
    setDialog(null)
  }
  return (
    <>
      <Card className='history-card'>
      <ListItemLink href={href}>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={e=>setDialog('edit')}>
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={e=>setDialog('delete')}>
            <Delete />
          </IconButton>
          <Link href={`tel:${number}`}>
            <IconButton edge="end" aria-label="call">
              <Call/>
            </IconButton>
          </Link>
        </ListItemSecondaryAction>
      </ListItemLink>
      </Card>
      {dialog === 'edit' &&
        <EditDialog
          handleClose={()=>setDialog(null)}
          name={number === name ? '' : name}
          handleSave={handleSave}
        />
      }
      {dialog === 'delete' &&
        <DeleteDialog
          handleClose={()=>setDialog(null)}
          handleDelete={handleDelete}
          name={name}
        />
      }
    </>
  )
}

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

function EditDialog({handleClose, handleSave, name}: {handleClose: () => void, handleSave: (name:string) => void, name: string}){
  const [userName, setName] = React.useState(name)
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To save this number, Please enter relevant name. Saved lists can be seen in separate tab.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Contact name"
          type="text"
          fullWidth
          value={userName}
          onChange={e=>setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={e=>handleSave(userName)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function DeleteDialog({handleClose, handleDelete, name}: {handleClose: () => void, handleDelete: () => void, name: string}){
  return (
    <Dialog
      open
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Confirm deleting this entry ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to remove <b>{name}</b>. This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}