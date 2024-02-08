import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function AddEntreprise(props) {
   
  const [entrepriseIds, setEntrepriseIds] = React.useState([]);
  const [entreprisesLoad, setEntreprisesLoad] = React.useState([])
  const [entrepriseId, setEntrepriseId] = React.useState(0)

  const handleChanged = (event) => {
    const {
      target: { value },
    } = event;
    setEntrepriseIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

 
  const handleClose = () => {
    
    props.value.handleCloseImg()
  }


  const handleChange = (e)=>{
    const target = e.target;
    const value = target.value;

      setEntrepriseId(value)
  }

   
  const handleSubmit = (event)=>{

    event.preventDefault()
    const id = props.value.data.id  ;
  
    const chaine = entrepriseIds.join(',')
    console.log(" chaine : ",chaine )
    /* on doit convertir entrepriseIds en tableau, il est en json
     * sur postMan pour envoyé un tableau on met pas crochet mais directement
     * les valeurs 1,3,5 au lieu de [1,3,5] .join(',')
     *  */
     axios
      .post("/formations/add-entreprises",null, {
        params:{
            formationId : id,
            entrepriseIds : entrepriseIds.join(',')
        }
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


    React.useEffect(() => {
    
  handleLoadData()
    
  }, [])

  const handleLoadData = ()=>{

    axios.get("/entreprises")
      .then((res)=>{
        setEntreprisesLoad(res.data)
        
      })
      .catch((err)=>{
        console.log(err)
      })
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
        <DialogTitle>Ajouter une entreprise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez choisir les entreprises . 
          </DialogContentText>
         
            
                    <br/>
       <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label"> Entreprises</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={entrepriseIds}
          onChange={handleChanged}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {entreprisesLoad.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={entrepriseIds.indexOf(item.id) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Annuler</Button>
          <Button type="submit" variant='contained' color="success">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
