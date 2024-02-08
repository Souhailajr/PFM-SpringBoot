import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios, { AxiosError } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function DialogEvaluer({data}) {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate() 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {formation,errorToast,success} = data 


  return (
    <React.Fragment>
      <div 
      onClick={handleClickOpen}
      className='hover:cursor-pointer hover:bg-orange-100 shadow-sm border-2 border-orange-300 p-0.5 rounded-xl duration-300 ease-in-out'>
          <AssignmentIcon sx={{color:"blue"}}/>
          <span className='italic'>évaluer</span>
       </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;

            axios.get("/participants/findOneByUsername",{
                params : {
                    email : email 
                }
            })
            .then((res)=>{

                if(res.data.username){
                        success()
                        setTimeout(() => {
                            navigate(`/formation/${formation.id}/participant/${res.data.id}/formateur/${formation.userinfo?.id}/evaluation`)
                        }, 2000);
                }
                else{
                        errorToast()
                }

            })
            .catch((err)=>{
                console.error(err.message)
                errorToast()
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>Evaluation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez saisir votre email que vous avez ajouter dans l'inscription de cette formation !.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Addresse Email"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">Annuler</Button>
          <Button type="submit" color="success" variant="contained">Valide</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
