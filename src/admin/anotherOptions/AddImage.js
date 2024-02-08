import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AddImage(props) {
   
 
  const handleClose = () => {
    
    props.value.handleCloseImg()
  }

  const handleSubmit = (event)=>{

    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const image = formJson.image;
    const id = props.value.data.id  ;

    const formDataa = new FormData();
    formDataa.append('id', id);
    formDataa.append('image', image);
    
     axios
      .post("/formations/image", formDataa, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
         props.value.handleUpdateAlertandData()
         console.log(res.data)
      })
      .catch((error) => {
        console.log(error.message);
    
      });

    handleClose();
  }


  return (
    <React.Fragment>
      <Dialog
        open={props.value.opened}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Ajouter une image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez séléctionner une image . 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="image"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
       <Button sx={{ marginRight: 2}} onClick={handleClose} variant="contained" color='error'>Annuler</Button>
            <Button type="submit" variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
