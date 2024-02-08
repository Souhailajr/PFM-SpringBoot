import React,{useState,useContext, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PrincipalContext } from '../Context'; 
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export default function RegisterU() {

  const {idformation} = useParams() 

  const {connected,setConnected} = useContext(PrincipalContext)

  const [formateur, setFormateur] = useState(
    {
      firstname : "",
      lastname : "",
      username : "",
      password : "",
      secondPassword:"",
      phone : "",
      ville : "",
      datenaissance:"",
    }
  )


  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   const handleChange = (e) => {
  
    const target = e.target;
    const value = target.value;
    const name = target.name ;


    setFormateur((prev) => ({
      ...prev,
      [name]: value,
    }))

  }


 const handleSubmit = (e) => {
    e.preventDefault();

     if(formateur.password != formateur.secondPassword)
    {
     
     alert("Mot de passe ne correspondent pas !")
     setFormateur((prev)=>({
      ...prev,
      password : "",
      secondPassword : "", 
     }))
    }
    else {

      formateur.firstname === "" ||
      formateur.lastname === "" ||
      formateur.datenaissance === "" ||
      formateur.username === "" ||
      formateur.password ==="" ||
      formateur.phone === "" ? alert("veuillez remplir tout les champs *") : save()
    }
  
  }

 
const alertToast = ()=> toast.success('succès !', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });


  const save = ()=>{
       
     // Supprimer la clé 'secondPassword' et sa valeur du state
   const { secondPassword, ...data } = formateur;

    axios
      .post("/participants", data,{
        params : {
          formationId : idformation
        }
      })
      .then((res) => {

         alertToast()

         setTimeout(() => {
           navigate(`/formation/${idformation}`);
         }, 3000);
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette participant existe déjà !.")
      });
  }


  return (
    <div className=' bg-slate-50 '>
        <div className='flex h-[100vh]  justify-center'>
            <div className='border-orange-300 mt-12 h-[65vh] p-4 border-2 rounded-xl'>
              <div className='font-black bg-black rounded-xl text-white p-x max-w-[25rem] mx-auto flex justify-center items-center space-x-4 my-5 text-md'>
                <AccountBoxIcon  sx={{fontSize:40}}/> <p>S'inscrire à la formation</p> </div>
            <Box 
                component="form"
                onSubmit={handleSubmit}>
               <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '55ch' },
                }}
                noValidate
                autoComplete="off"
              >
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name"
                    >
                        Nom</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            name="firstname"
                            value={formateur.firstname}
                            onChange={handleChange}
                            
                            label="name"
                          />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-lastname"
                    >
                        Prenom</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-lastname"
                            type="text"
                            name="lastname"
                            value={formateur.lastname}
                            onChange={handleChange}
                            label="prenom"
                          />
                    </FormControl> <br/>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username"
                    >
                        Email</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            name="username"
                            value={formateur.username}
                            onChange={handleChange}
                            label="username"
                          />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-phone"
                    >
                        Phone </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-phone"
                            type="text"
                            name="phone"
                            value={formateur.phone}
                            onChange={handleChange} 
                            label="phone"
                          />
                    </FormControl> <br/>

                 <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-ville"
                    >
                        Ville </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-ville"
                            type="text"
                            name="ville"
                            value={formateur.ville}
                            onChange={handleChange}
                            label="Ville"
                          />
                    </FormControl>

               <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-date">Née le</InputLabel>
                <TextField
                    id="outlined-adornment-date"
                    type="date"
                    name="datenaissance"
                    value={formateur.datenaissance}
                    onChange={handleChange}
                    label="Date de naissance"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl> 
                    <br/>

                  <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"
                    startadornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              >
                  Mot de passe</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name= "password"
                      value={formateur.password}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                       endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    
                  </FormControl>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"
                    startadornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              >
                  Mot de passe</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password2"
                      name="secondPassword"
                      value={formateur.secondPassword}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                       endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password2"
                    />
                    
                  </FormControl>

                </Box>
                <div className='flex mb-3 justify-center'>
                     <Button type="submit" variant="contained" sx={{mt:3 , width:150}}>Valider</Button>
                </div>
            </Box>
            </div>
        </div>
   <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />

    </div>
  )
}

