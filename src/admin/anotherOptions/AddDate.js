import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


export default function AddDate(props) {
   
    const [date, setDate] = React.useState("")
 
  const handleClose = () => {
    
    props.value.handleCloseImg()
  }

  const handleChange = (e)=>{
    const target = e.target;
    const value = target.value;

      setDate(value)
  }



  const handleSubmit = (event)=>{
      
      event.preventDefault()
      const id = props.value.data.id  ;
    console.log(" data  : " , id , " -- ", date)
    axios
        .post("/formations/date-planification",null, {
        params: {
        id: id,
        date: date,
        }
        })
        .then((res) => {
        props.value.handleUpdateAlertandData()
        console.log(res.data)
        })
        .catch((error) => {
        console.log(error.message);
        })
    

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
        <DialogTitle>Planification</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Date de début de formation
          </DialogContentText>
         
                    <FormControl sx={{ m: 1, width: '55ch' }}>
                      <TextField id="outlined-basic" type="date" label="Date début" name="date" value={date} onChange={handleChange} variant="outlined" />
                    </FormControl>
                

        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <Button sx={{ marginRight: 2}} onClick={handleClose} variant="contained" color='error'>Annuler</Button>
            <Button type="submit" variant="contained">Ajouter</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
